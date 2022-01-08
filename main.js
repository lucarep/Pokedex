let poke_container = document.getElementById('poke-container');

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
            pokeCardID.classList.add('pokeID');
            const pokeID = pokemon.id.toString().padStart(3,'0');
            pokeCardID.innerHTML = "#" + pokeID;
            // Pokemon Type
            let pokeTypeCard = document.createElement('h6');
            pokeTypeCard.classList.add('card-subtitle');
            const pokeType = pokemon.types.map(el => el.type.name);
            //console.log(pokeType);
            if (pokeType.length == 2) {
                pokeTypeCard.innerHTML = "Types: " + pokeType[0] + " " + pokeType[1];
            }
            else{
                pokeTypeCard.innerHTML = "Type: " + pokeType;
            }
            
    
    poke_container.appendChild(pokeCard);
    pokeCard.appendChild(pokeSprite);
    pokeCard.appendChild(pokeCardBody);
    pokeCardBody.appendChild(pokeCardID);
    pokeCardBody.appendChild(pokeCardTitle);
    pokeCardBody.appendChild(pokeTypeCard);
    
    
    
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
    for (let i = 1; i < 800; i++) {
        await fetchPokemon(i);   
        if (i == 151) {
            let label = document.createElement('h3');
            label.innerHTML = "Johto (152-251)";
            poke_container.appendChild(label);
        }
    }
}

fetchPokemons()