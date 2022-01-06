let poke_container = document.getElementById('poke-container');
let pokemon_number = 151;

function createCard(pokemon){
    let pokeCard = document.createElement('div');
    pokeCard.classList.add('card');
    pokeCard.style.width = "300px";
        let pokeSprite = document.createElement('img');
        pokeSprite.classList.add('card-img-top');
        pokeSprite.src = pokemon.sprites.front_default;
        let pokeCardBody = document.createElement('div');
        pokeCardBody.classList.add('card-body');
        poke_container.appendChild(pokeCard);
            // Pokemon name
            let pokeCardTitle = document.createElement('h5');
            pokeCardTitle.classList.add('card-title');
            const pokeName = pokemon.name;
            pokeCardTitle.innerHTML = pokeName;
            // Pokemon ID
            let pokeCardID = document.createElement('h6');
            pokeCardID.classList.add('card-subtitle');
            const pokeID = pokemon.id;
            pokeCardID.innerHTML = pokeID;
    
    poke_container.appendChild(pokeCard);
    pokeCard.appendChild(pokeSprite);
    pokeCard.appendChild(pokeCardBody);
    pokeCardBody.appendChild(pokeCardTitle);
    pokeCardBody.appendChild(pokeCardID);
    
    
    
}

// function to fetch data from API
const fetchPokemon = async id => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let pokemon = await res.json();
    createCard(pokemon);
    console.log(pokemon);
}

const fetchPokemons = async () => {
    for (let i = 1; i < pokemon_number; i++) {
        await fetchPokemon(i);   
    }
}

fetchPokemons()