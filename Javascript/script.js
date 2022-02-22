import { Pokemon } from "./Pokemon.js";

//Skapa klass objektet för att komma åt metoder
const pokemon = new Pokemon();

//Använd klass objektet för att kalla på metoden som retunerar en array med objekt från api:n
const array = await pokemon.GetPokemonArray(1, 6);

console.log(array[0].name);
