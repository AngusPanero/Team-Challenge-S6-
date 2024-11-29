const search = document.getElementById("searchBtn");
const anterPag = document.getElementById("prevBtn");
const proxPag = document.getElementById("nextBtn");
const reseteo = document.getElementById("resetBtn");
const app = document.getElementById("app");
const url = "https://pokeapi.co/api/v2/pokemon?limit=10"


const pokemonesFiltrados = []
const cadaPokeData = []

// Acá inicio la solicitud fetch

const pokeFetch = async (id) => {
    const url2 = `https://pokeapi.co/api/v2/pokemon/${id}/`
    try{
        const response = await fetch (url2);
        if (!response.ok) {
            throw new Error ("Error en la solicitud", response.status);
        }
        const data = await response.json();
        console.log("Data Template", data);
        app.innerHTML += `
            <div class="pokeDatos">
        <h2>${data.name.toUpperCase()}</h2>
        <img src=${data.sprites.front_default} alt="${data.name}">
        <h3>Tipo: ${data.types[0].type.name.toUpperCase()}</h3>
        <h3>Altura: ${data.height} Ft</h3>
        <h3>Peso: ${data.weight} Kg.</h3>
        </div>
        `;
        return data;
    }   
    catch (error){
        console.log("Ha Surgido un Error", error)
    }
}

const obtenerVariosPokemones = async () => {
    for (let id = 1; id <= 10; id++) { 
        const pokemon = await pokeFetch(id);
    }
};

const template = async () => {
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
    }

    catch (error){
        console.log("Ha Surgido un Error", error)
    };
}

function cargarPokemones () {
    app.innerHTML = `
    
    `
}

pokeFetch();
obtenerVariosPokemones()
template();
cargarPokemones()