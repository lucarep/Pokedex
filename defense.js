let normal = {
  fighting: 2,
  normal: 1,
  flying: 1,
  poison: 1,
  ground: 1,
  rock: 1,
  bug: 1,
  ghost: 0,
  steel: 1,
  fire: 1,
  water: 1,
  grass: 1,
  electric: 1,
  psychic: 1,
  ice: 1,
  dragon: 1,
  dark: 1,
  fairy: 1,
};
let ghost = {
  normal: 0,
  fighting: 0,
  flying: 1,
  poison: 0.5,
  ground: 1,
  rock: 1,
  bug: 0.5,
  ghost: 2,
  steel: 1,
  fire: 1,
  water: 1,
  grass: 1,
  electric: 1,
  psychic: 1,
  ice: 1,
  dragon: 1,
  dark: 2,
  fairy: 1,
};
let psychic = {
  bug: 2,
  ghost: 2,
  dark: 2,
  normal: 1,
  flying: 1,
  poison: 1,
  ground: 1,
  rock: 1,
  steel: 1,
  fire: 1,
  water: 1,
  grass: 1,
  electric: 1,
  ice: 1,
  dragon: 1,
  fairy: 1,
  fighting: 0.5,
  psychic: 0.5,
};
let ground = {
  water: 2,
  grass: 2,
  ice: 2,
  normal: 1,
  fighting: 1,
  flying: 1,
  ground: 1,
  bug: 1,
  ghost: 1,
  steel: 1,
  fire: 1,
  psychic: 1,
  dragon: 1,
  dark: 1,
  fairy: 1,
  poison: 0.5,
  rock: 0.5,
  electric: 0,
};
let rock = {
  fighting: 2,
  ground: 2,
  steel: 2,
  water: 2,
  grass: 2,
  rock: 1,
  bug: 1,
  ghost: 1,
  electric: 1,
  psychic: 1,
  ice: 1,
  dragon: 1,
  dark: 1,
  fairy: 1,
  normal: 0.5,
  flying: 0.5,
  poison: 0.5,
  fire: 0.5,
};

let data = [normal, ghost, psychic, ground, rock];

function combineTypes(type1, type2) {
  let combined = {};
  for (let key in type1) {
    //console.log(key + ": " + type1[key]);
    if (type2[key] == 0 || type1[key] == 0) {
      let val = 0;
      combined[key] = val;
    } else if (type1[key] == 0.5 && type2[key] == 0.5) {
      combined[key] = 0.25;
    } else if (
      (type1[key] == 0.5 && type2[key] == 2) ||
      (type1[key] == 2 && type2[key] == 0.5)
    ) {
      combined[key] = 1;
    } else if (type2[key] > type1[key] && type2[key] == 2) {
      let val = type2[key];
      combined[key] = val;
    } else if (type2[key] < type1[key] && type1[key] == 2) {
      let val = type1[key];
      combined[key] = val;
    } else if (type2[key] + type1[key] > 2) {
      let val = type2[key] + type1[key];
      combined[key] = val;
    } else if (type2[key] == 0.5) {
      combined[key] = 0.5;
    } else if (type1[key] == 0.5) {
      combined[key] = 0.5;
    } else {
      let val = type2[key] + type1[key];
      combined[key] = 1;
    }
  }
  return combined;
}

let res = combineTypes(data[0], data[1]);
console.log("RESULT");
console.log(res);
