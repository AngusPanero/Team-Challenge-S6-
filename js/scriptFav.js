document.addEventListener("click", (event) => {
    if (event.target.classList.contains("imgEstrellaSumado")) {
        const pokeDatos = event.target.closest(".pokeDatos");
        const nombrePokemon = pokeDatos.querySelector("h2").textContent.trim();
        const tipoPokemon = pokeDatos.querySelector("p:nth-of-type(1)").textContent.trim();
        const alturaPokemon = pokeDatos.querySelector("p:nth-of-type(2)").textContent.trim();
        const pesoPokemon = pokeDatos.querySelector("p:nth-of-type(3)").textContent.trim();
        const imagenPokemon = pokeDatos.querySelector("img").src;

        const pokemon = {
            nombre: nombrePokemon,
            tipo: tipoPokemon,
            altura: alturaPokemon,
            peso: pesoPokemon,
            imagen: imagenPokemon
        };

        // Obtener favoritos desde localStorage
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // Filtrar el Pokémon para eliminarlo de favoritos
        favoritos = favoritos.filter(fav => fav.nombre !== pokemon.nombre);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // Mostrar los favoritos actualizados
        mostrarFavoritos();
    }
});

// Función para mostrar los favoritos en la pantalla
function mostrarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const contenedorFavoritos = document.getElementById("favoritosContainer");

    contenedorFavoritos.innerHTML = ""; // Limpiar el contenedor antes de agregar los nuevos favoritos

    favoritos.forEach(pokemon => {
        contenedorFavoritos.innerHTML += `
            <div class="pokeDatos">
                <h2>${pokemon.nombre.toUpperCase()}</h2>
                <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
                <p>${pokemon.tipo}</p>
                <p>A${pokemon.altura}</p>
                <p>${pokemon.peso}</p>
                <img class="imgEstrellaSumado" src="./assets/img/estrella.png" alt="estrella favorita">
            </div>
        `;
    });
}

// Llamar a mostrarFavoritos cuando cargues la página para mostrar los favoritos guardados
window.onload = function() {
    mostrarFavoritos();
};
console.log(localStorage);