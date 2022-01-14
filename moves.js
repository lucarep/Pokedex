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

const secondaryColors = {
  bug: "#064635",
  dark: "#160040",
  dragon: "#6E3CBC",
  electric: "#FFCE45",
  fairy: "#FF87CA",
  fighting: "#FF8243",
  flying: "#2F86A6",
  ghost: "#544179",
  grass: "#146356",
  ground: "#E5890A",
  ice: "#8AB6D6",
  normal: "#476072",
  fire: "#D9534F",
  poison: "#4C0070",
  psychic: "#A03C78",
  rock: "#9D5C0D",
  steel: "#2C394B",
  water: "#22577E",
};

let move_container = document.getElementById("move-container");
let alert_container = document.getElementById("alert-container");
let searchBar = document.getElementById("searchMoveBar");
let moveList = [];
let flag = false;


function createMove(move) {
  let moveDiv = document.createElement("div");
  moveDiv.classList.add("row", "moveRow");
  moveDiv.style.backgroundColor = colors[move.type.name];
  // Name and type
  let nameCol = document.createElement("div");
  nameCol.classList.add("col");
  let moveName = document.createElement("h3");
  moveName.innerHTML = "<strong>" + move.names[7].name + "</strong>";
  let moveType = document.createElement("h3");
  moveType.classList.add("pokeID");
  moveType.innerHTML = "<em>" + move.type.name + "</em>";
  // Description
  let descCol = document.createElement("div");
  descCol.classList.add("col");
  let preamble = document.createElement("h4");
  preamble.innerHTML = "Description:";
  let desc = document.createElement("p");
  desc.innerHTML = move.flavor_text_entries[1].flavor_text;
  // Power
  let powerCol = document.createElement("div");
  powerCol.classList.add("col");
  let powerName = document.createElement("h4");
  if (move.power != null) {
    powerName.innerHTML = "Power: " + move.power;
  } else {
    powerName.innerHTML = "Power: --";
  }
  let effectName = document.createElement("h4");
  if (move.effect_chance != null) {
    effectName.innerHTML = "Effect Chance: " + move.effect_chance;
  } else {
    effectName.innerHTML = "Effect Chance: --";
  }
  // Accuracy
  let accuracyCol = document.createElement("div");
  accuracyCol.classList.add("col");
  let accuracyName = document.createElement("h4");
  if (move.accuracy != null) {
    accuracyName.innerHTML = "Accuracy: " + move.accuracy;
  } else {
    accuracyName.innerHTML = "Accuracy: --";
  }
  // Other
  let otherCol = document.createElement("div");
  otherCol.classList.add("col");
  let dmgType = document.createElement("h5");
  dmgType.innerHTML = "Dmg type: " + move.damage_class.name;
  let priority = document.createElement("h5");
  priority.innerHTML = "Priority: " + move.priority;
  let pp = document.createElement("h5");
  pp.innerHTML = "PP: " + move.pp;

  move_container.appendChild(moveDiv);
  moveDiv.appendChild(nameCol);
  nameCol.appendChild(moveName);
  nameCol.appendChild(moveType);
  moveDiv.appendChild(descCol);
  descCol.appendChild(preamble);
  descCol.appendChild(desc);
  moveDiv.appendChild(powerCol);
  powerCol.appendChild(powerName);
  powerCol.appendChild(effectName);
  moveDiv.appendChild(accuracyCol);
  accuracyCol.appendChild(accuracyName);
  moveDiv.appendChild(otherCol);
  otherCol.appendChild(dmgType);
  otherCol.appendChild(priority);
  otherCol.appendChild(pp);
}

const fetchMove = async (id) => {
  let url = `https://pokeapi.co/api/v2/move/${id}`;
  let res = await fetch(url);
  let move = await res.json();
  createMove(move);
  moveList.push(move);
};

const fetchMoves = async () => {
  for (let i = 1; i < 500; i++) {
    await fetchMove(i);
  }
  flag = true;
};

fetchMoves();
