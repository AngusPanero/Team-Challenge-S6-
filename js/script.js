const search = document.getElementById("searchBtn");
const anterPag = document.getElementById("prevBtn");
const proxPag = document.getElementById("nextBtn");
const reseteo = document.getElementById("resetBtn");
const app = document.getElementById("app");
let offset = 0;
let limit = 10;
let totalPaginas = 132;
let paginaActual = 1;


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

        cargarPokemones(detalles)
        console.log("Data Completa Pokémon:", detalles);

        return detalles;

    } catch (error) {
        console.log("Ha surgido un error", error);
        return [];
    }
};

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
                <div class="pokemon-card">
                    <h2>${pokemon.name}</h2>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>Tipo: ${pokemon.types.map(type => type.type.name).join(", ").toUpperCase()}</p>
                    <p>Altura: ${pokemon.height} m</p>
                    <p>Peso: ${pokemon.weight} kg</p>
                </div>
            `;
        }
    });
};

proxPag.addEventListener("click", () => {
    if (paginaActual < totalPaginas){
        offset += limit; // se actualiza offset en el valor de limit
        paginaActual++

        pokemonFetch(); 
    }
})

anterPag.addEventListener("click", () => {
    if (paginaActual > 1){
        offset -= limit; // se actualiza offset en el valor de limit
        paginaActual--

        pokemonFetch(); 
    }
})

pokemonFetch();
