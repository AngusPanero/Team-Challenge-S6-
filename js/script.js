const search = document.getElementById("searchBtn");
const anterPag = document.getElementById("prevBtn");
const proxPag = document.getElementById("nextBtn");
const reseteo = document.getElementById("resetBtn");
const app = document.getElementById("app");
const url = "https://pokeapi.co/api/v2/pokemon?limit=10"

const pokemonesFiltrados = []

// Acá inicio la solicitud fetch

const template = async (id) => {
    const url2 = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    try{
        const response = await fetch (url2);
        if (!response.ok) {
            throw new Error ("Error en la solicitud", response.status);
        }
        const data = await response.json();
        console.log("Data Template", data);
        return data;
    }   
    catch (error){
        console.log("Ha Surgido un Error", error)
    }
}

const obtenerVariosPokemones = async () => {
    for (let id = 1; id <= 10; id++) { 
        const pokemon = await template(id); 
        if (pokemon) {
            console.log(`Nombre del Pokémon: ${pokemon.name}, ID: ${pokemon.id}`); 
        }
    }
};

const pokeFetch = async () => {
    try {
        const response = await fetch (url)
            if (!response.ok){
            throw new Error ("Error en la solicitud", response.status);
        }
        const data = await response.json();
        console.log("Limit 10",data);

        for (let i = 0; i < data.results.length; i++){
        const pokemonData = {
            urlEspecifico: data.results[i].url,
        }
        pokemonesFiltrados.push(pokemonData);
        };
        console.log(pokemonesFiltrados); 
    }

    catch (error){
        console.log("Ha Surgido un Error", error)
    };
}

obtenerVariosPokemones();

pokeFetch();
