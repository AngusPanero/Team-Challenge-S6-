const search = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Evento click para borrar favoritos
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

        // Consigo los favoritos del localStorage
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // Filtro para eliminarlo
        favoritos = favoritos.filter(fav => fav.nombre !== pokemon.nombre);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        mostrarFavoritos(); // Actualizo la visualización
    }
});

// Función para mostrar favoritos
function mostrarFavoritos(pokemones = null) {
    const favoritos = pokemones || JSON.parse(localStorage.getItem("favoritos")) || [];
    const contenedorFavoritos = document.getElementById("favoritosContainer");

    contenedorFavoritos.innerHTML = ""; // Limpio el contenedor antes de agregar los nuevos favoritos

    favoritos.forEach(pokemon => {
        contenedorFavoritos.innerHTML += `
            <div class="pokeDatos">
                <h2>${pokemon.nombre.toUpperCase()}</h2>
                <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
                <p>${pokemon.tipo}</p>
                <p>${pokemon.altura}</p>
                <p>${pokemon.peso}</p>
                <img class="imgEstrellaSumado" src="./assets/img/estrella.png" alt="estrella favorita">
            </div>
        `;
    });
}

// Evento del buscador
search.addEventListener("click", () => {
    const valorIngresado = searchInput.value.toLowerCase();

    // Obtengo los favoritos desde localStorage para realizar la búsqueda
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const pokemonFiltro = favoritos.filter(pokemon => 
        // pokemon me representa cada Pokémon
        pokemon.nombre.toLowerCase().includes(valorIngresado) || 
        pokemon.tipo.toLowerCase().includes(valorIngresado)
    );

    if (pokemonFiltro.length === 0) { // Compruebo que esté vacío ya que no se ingresaría ningún valor
        alert("¡No se ha encontrado al Pokémon!");
    } else {
        mostrarFavoritos(pokemonFiltro); // Muestro solo los resultados filtrados
    }
});

// Llamo a mostrarFavoritos para inicializar la visualización con los datos del localStorage
mostrarFavoritos();
console.log(localStorage);
