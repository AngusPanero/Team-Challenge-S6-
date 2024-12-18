const searchInput = document.getElementById("searchInput");
const search = document.getElementById("searchBtn");
const anterPag = document.getElementById("prevBtn");
const proxPag = document.getElementById("nextBtn");
const reseteo = document.getElementById("resetBtn");
const app = document.getElementById("app");
const favoritos = document.getElementById("imgEstrella")
let offset = 0;
let limit = 10;
let totalPaginas = 132;
let paginaActual = 1;
let buscadorPokemon = []; // Acá me estoy almacenando mis pokemones del buscdor para mostrarlos con la funcion cargar pokemon pero con el parama¡etro de la filtración

// Acá me traigo los 10 primeros
const pokemonFetch = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en la solicitud", response.status);
        }
        const data = await response.json();
        console.log("Limit 10", data);

        
        const detalles = await Promise.all(
            data.results.map((pokemon) => pokemonFetchData(pokemon.url))
        );
        
        buscadorPokemon = detalles;
        cargarPokemones(buscadorPokemon); // Aca antes el parametro era detalle pero ahora lo actualizamos ya que en la linea de arriba lo igualamos al buscador 
        console.log("Data Completa Pokémon:", detalles);

        return detalles;

    } catch (error) {
        console.log("Ha surgido un error", error);
        return [];
    }
};
// Acá traigo su data exacta, pasandola arriba para el promise all para que me itere cada url
const pokemonFetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en la solicitud", response.status);
        }
        
        const data = await response.json();
        console.log("Detalles del Pokémon:", data);
        
        return data;

    } catch (error) {
        console.log("Ha surgido un error al obtener los detalles", error);
    }
};

function cargarPokemones (detalles) {
    app.innerHTML = "";

    detalles.forEach(pokemon => {
        if (pokemon) {
            app.innerHTML += `
                <div class="pokeDatos">
                    <h2>${pokemon.name.toUpperCase()}</h2>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>Tipo: ${pokemon.types.map(type => type.type.name).join(", ").toUpperCase()}</p>
                    <p>Altura: ${pokemon.height} Dm</p>
                    <p>Peso: ${pokemon.weight} Hg</p>
                    <img class="imgEstrella" src="./assets/img/estrella.png" alt="pokeBall">
                </div>
            `;
        }
    });
};

proxPag.addEventListener("click", () => {
    if (paginaActual < totalPaginas){
        offset += limit; // Acá me actualiza offset en el valor de limit
        paginaActual++

        pokemonFetch(); 
    }
})

anterPag.addEventListener("click", () => {
    if (paginaActual > 1){
        offset -= limit; // Acá me actualiza offset en el valor de limit
        paginaActual--

        pokemonFetch(); 
    }
})

search.addEventListener("click", () => {
    const valorIngresado = searchInput.value.toLowerCase();

    const pokemonFiltro = buscadorPokemon.filter(pokemon => 
        // pokemon me representa cada pokemon
        pokemon.name.toLowerCase().includes(valorIngresado) || 
        pokemon.types.some(type => type.type.name.toLowerCase().includes(valorIngresado)) 
        // .some me verifica si al enos alguno cumple parametro ya que en type tengo dos valores (EJ: fuego, volador)
);
if (pokemonFiltro.length === 0) {// compruebo que este vacio ya que no se ingresaria ningun valoe
    alert ("No se ha encontrado al Pokemon!")}

    cargarPokemones(pokemonFiltro);
});

reseteo.addEventListener("click", () => {
    app.innerHTML = ``
    offset = 0
    pokemonFetch()
})

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("imgEstrella") || event.target.classList.contains("imgEstrellaSumado")) {
        const pokeDatos = event.target.closest(".pokeDatos");
        const nombrePokemon = pokeDatos.querySelector("h2").textContent.trim();
        const tipoPokemon = pokeDatos.querySelector("p:nth-of-type(1)").textContent.trim();
        const alturaPokemon = pokeDatos.querySelector("p:nth-of-type(2)").textContent.trim();
        const pesoPokemon = pokeDatos.querySelector("p:nth-of-type(3)").textContent.trim();
        const imagenPokemon = pokeDatos.querySelector("img").src;

        // Creo mi objeto Pokémon con el dato del que selecciono con el event.target
        const pokemon = {
            nombre: nombrePokemon,
            tipo: tipoPokemon,
            altura: alturaPokemon,
            peso: pesoPokemon,
            imagen: imagenPokemon
        };

        // En esta constante me estoy trayendo los datos que se guardan en el LocalStorage va arriba por cascada
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // Acá Verifico si existe ya en el favoritos
        const existe = favoritos.some(fav => fav.nombre === pokemon.nombre);

        // Si no lo tengo en fav, la agrego y cambio la clase para CSS
        if (!existe) {
            favoritos.push(pokemon);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            event.target.classList.remove("imgEstrella");
            event.target.classList.add("imgEstrellaSumado");
        } else {
            // Si ya está lo elimino y cambio la clase que puse
            favoritos = favoritos.filter(fav => fav.nombre !== pokemon.nombre);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            
            event.target.classList.remove("imgEstrellaSumado");
            event.target.classList.add("imgEstrella");
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // obtengo el local en esta const
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // reviso si ya existe en fav
    const todasLasEstrellas = document.querySelectorAll(".imgEstrella, .imgEstrellaSumado");

    todasLasEstrellas.forEach(estrella => {
        const pokeDatos = estrella.closest(".pokeDatos");
        const nombrePokemon = pokeDatos.querySelector("h2").textContent.trim();

        // Si el Pokémon está cambio clase
        const estaEnFavoritos = favoritos.some(fav => fav.nombre === nombrePokemon);
        if (estaEnFavoritos) {
            estrella.classList.remove("imgEstrella");
            estrella.classList.add("imgEstrellaSumado");
        }
    });
});

pokemonFetch();
