const colors = {
    bug : '#99A799',
    dark : '#707070',
    dragon : "#C9CBFF",
    electric : "#FFF1AF",
    fairy : "#FFE2E2",
    fighting : "#F6AE99",
    flying : "#EFF8FF",
    ghost : "#BAABDA",
    grass : '#D3E4CD',
    ground : "#FFE6BC",
    ice : "#92A9BD",
    normal : "#DAD0C2",
    fire : '#FFC286',
    poison : "#B97A95",
    psychic : "#FAB7B7",
    rock : "#C3B091",
    steel : "#DDDDDD",
    water : '#CDF0EA'
};
const main_types = Object.keys(colors);

let poke_container = document.getElementById('poke-container');

function createCard(pokemon){
    let pokeCard = document.createElement('div');
    pokeCard.classList.add('card');
    // Front
    let pokeCardF = document.createElement('div');
    pokeCardF.classList.add('front');
        let pokeSprite = document.createElement('img');
        pokeSprite.classList.add('card-img-top');
        pokeSprite.src = pokemon.sprites.front_default;
        let pokeCardBody = document.createElement('div');
        pokeCardBody.classList.add('card-body');
        //poke_container.appendChild(pokeCard);
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
                const color1 = colors[pokeType[0]];
                const color2 = colors[pokeType[1]];
                const orientation = 'to bottom right';
                pokeCard.style.backgroundImage = 'linear-gradient('
                + orientation + ', ' + color1 + ', ' + color2 + ')';
                pokeCard.style.borderColor = color1;
            }
            else{
                pokeTypeCard.innerHTML = "Type: " + pokeType;
                const color = colors[pokeType[0]];
                pokeCard.style.backgroundColor = color;
                pokeCard.style.borderColor = color;
            }
    // Back
    //stat value [0 ... 5]
    //console.log(pokemon.stats[0].base_stat);
    // stat name [0 ... 5]
    //console.log(pokemon.stats[0].stat.name);
    let pokeCardB = document.createElement('div');
    pokeCardB.classList.add('back');


    poke_container.appendChild(pokeCard);
    pokeCard.appendChild(pokeCardF);
    // Front
    pokeCardF.appendChild(pokeSprite);
    pokeCardF.appendChild(pokeCardBody);
    pokeCardBody.appendChild(pokeCardID);
    pokeCardBody.appendChild(pokeCardTitle);
    pokeCardBody.appendChild(pokeTypeCard);
    pokeCard.appendChild(pokeCardB);
    // Back
    for (let i = 0; i < pokemon.stats.length; i++) {
        let test = document.createElement('h5');
        test.classList.add('card-subtitle');
        test.innerHTML = pokemon.stats[i].stat.name + ":  "
        + pokemon.stats[i].base_stat;
        pokeCardB.appendChild(test);
    }
    
    
    
}

// function to fetch data from API
const fetchPokemon = async id => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let pokemon = await res.json();
    createCard(pokemon);
    //console.log(pokemon);
}

const fetchPokemons = async () => {
    for (let i = 1; i < 899; i++) {
        await fetchPokemon(i);   
        if (i == 151) {
            let label = document.createElement('h3');
            label.innerHTML = "Johto (152-251)";
            poke_container.appendChild(label);
        }
        if (i == 251) {
            let label = document.createElement('h3');
            label.innerHTML = "Hoenn (252-386)";
            poke_container.appendChild(label);
        }
        if (i == 386) {
            let label = document.createElement('h3');
            label.innerHTML = "Sinnoh (387-493)";
            poke_container.appendChild(label);
        }
        if (i == 493) {
            let label = document.createElement('h3');
            label.innerHTML = "Unima (494-649)";
            poke_container.appendChild(label);
        }
        if (i == 649) {
            let label = document.createElement('h3');
            label.innerHTML = "Kalos (650-721)";
            poke_container.appendChild(label);
        }
        if (i == 721) {
            let label = document.createElement('h3');
            label.innerHTML = "Alola (722-807)";
            poke_container.appendChild(label);
        }
        if (i == 809) {
            let label = document.createElement('h3');
            label.innerHTML = "Galar (809-896)";
            poke_container.appendChild(label);
        }
    }
}

fetchPokemons()