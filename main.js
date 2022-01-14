const colors = {
  bug: "#99A799",
  dark: "#707070",
  dragon: "#C9CBFF",
  electric: "#FFF1AF",
  fairy: "#FFE2E2",
  fighting: "#F6AE99",
  flying: "#EFF8FF",
  ghost: "#BAABDA",
  grass: "#D3E4CD",
  ground: "#FFE6BC",
  ice: "#92A9BD",
  normal: "#DAD0C2",
  fire: "#FFC286",
  poison: "#B97A95",
  psychic: "#FAB7B7",
  rock: "#C3B091",
  steel: "#DDDDDD",
  water: "#CDF0EA",
};
const main_types = Object.keys(colors);
let poke_container = document.getElementById("poke-container");
let searchBar = document.getElementById("searchBar");
let pokeList = [];
let flag = false;


searchBar.addEventListener('keyup',(e) =>{
  while (poke_container.firstChild) {
    poke_container.removeChild(poke_container.firstChild);
  }
  let searchString = e.target.value.toLowerCase();
  let filteredPokemons = pokeList.filter((pokemon) =>{
    if (pokemon.types.length == 2) {
      return (
        pokemon.name.includes(searchString) ||
        pokemon.types[0].type.name.includes(searchString) ||
        pokemon.types[1].type.name.includes(searchString)
      );
    }
    else {
      return (
        pokemon.name.includes(searchString) ||
        pokemon.types[0].type.name.includes(searchString)
      );
    }
  });
  filteredPokemons.forEach(mon => {
    createCard(mon);
  });
});

function createCard(pokemon) {
  let pokeCard = document.createElement("div");
  pokeCard.classList.add("card");
  // Front
  let pokeCardF = document.createElement("div");
  pokeCardF.classList.add("front");
  let pokeSprite = document.createElement("img");
  pokeSprite.classList.add("card-img-top");
  pokeSprite.src = pokemon.sprites.front_default;
  let pokeCardBody = document.createElement("div");
  pokeCardBody.classList.add("card-body");
  //poke_container.appendChild(pokeCard);
  // Pokemon name
  let pokeCardTitle = document.createElement("h5");
  pokeCardTitle.classList.add("card-title");
  const pokeName = pokemon.name;
  pokeCardTitle.innerHTML = pokeName;
  // Pokemon ID
  let pokeCardID = document.createElement("h6");
  pokeCardID.classList.add("card-subtitle");
  pokeCardID.classList.add("pokeID");
  const pokeID = pokemon.id.toString().padStart(3, "0");
  pokeCardID.innerHTML = "#" + pokeID;
  // Pokemon Type
  let pokeTypeCard = document.createElement("h6");
  pokeTypeCard.classList.add("card-subtitle");
  const pokeType = pokemon.types.map((el) => el.type.name);
  //console.log(pokeType);
  if (pokeType.length == 2) {
    pokeTypeCard.innerHTML = "Types: " + pokeType[0] + " " + pokeType[1];
    const color1 = colors[pokeType[0]];
    const color2 = colors[pokeType[1]];
    const orientation = "to bottom right";
    pokeCard.style.backgroundImage =
      "linear-gradient(" + orientation + ", " + color1 + ", " + color2 + ")";
    pokeCard.style.border = "2px solid #5b6467";
  } else {
    pokeTypeCard.innerHTML = "Type: " + pokeType;
    const color = colors[pokeType[0]];
    pokeCard.style.backgroundColor = color;
    pokeCard.style.border = "2px solid #5b6467";
  }
  let pokeCardB = document.createElement("div");
  pokeCardB.classList.add("back");

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
    let name = document.createElement("h6");
    name.classList.add("card-subtitle");
    name.innerHTML = pokemon.stats[i].stat.name + ":";
    let progress = document.createElement("div");
    progress.classList.add("progress");
    progress.style.margin = "5px";
    let progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.style.width = pokemon.stats[i].base_stat / 2 + "%";
    progressBar.setAttribute("aria-valuenow", 25);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 100);
    progressBar.textContent = pokemon.stats[i].base_stat;
    //progressBar.style.color = "#000000";
    //progressBar.style.backgroundColor = "#FFFFFF";
    pokeCardB.appendChild(name);
    pokeCardB.appendChild(progress);
    progress.appendChild(progressBar);
  }
}

// function to fetch data from API
const fetchPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let pokemon = await res.json();
  createCard(pokemon);
  pokeList.push(pokemon);
  console.log(pokemon.types[0].type.name)
};

const fetchPokemons = async () => {
  for (let i = 1; i < 899; i++) {
    await fetchPokemon(i);
  }
  flag = true;
};

fetchPokemons();




