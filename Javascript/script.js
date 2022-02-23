import { Pokemon } from "./Pokemon.js";

//Skapa klass objektet för att komma åt metoder
const pokemon = new Pokemon();

//Använd klass objektet för att kalla på metoden som retunerar en array med objekt från api:n

PrintPokeCard(1, 6);

async function PrintPokeCard(dexNumberStart, amount) {
  const array = await pokemon.GetPokemonArray(dexNumberStart, amount);
  console.log(array); //TODO radera, enbart hjälp vid skapande av metod

  const cards = document.querySelectorAll(".card");

  for (let card of cards) {
    const index = card.id.slice(5, 6) - 1; //TODO Fråga Sofiia om vi kan döpa om id för card så deras nummer är 0-5 istället för 1-6
    console.log(index);

    const nameElem = card.querySelector(".card-title");
    nameElem.innerHTML = array[index].name;
    nameElem.innerHTML = array[index].name.toUpperCase();

    const imgElem = card.querySelector(`#icon-${index + 1}`); //TODO rätta index?
    imgElem.src = array[index].spriteUrl;

    const priceElem = card.querySelector(".card-text"); //TODO skapa ett typeElem i index.html
    priceElem.innerHTML = `<div class="type ${
      array[index].typePrimary
    }">${array[index].typePrimary.toUpperCase()}</div>`;
    if (array[index].dualType) {
      priceElem.innerHTML += `<div class="type ${
        array[index].typeSecondary
      }">${array[index].typeSecondary.toUpperCase()}</div>`;
    }
  }
}
