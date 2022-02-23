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
    const index = card.id.slice(5, 6);
    console.log(index);

    const nameElem = card.querySelector(".card-title");
    nameElem.innerHTML = array[index].name;
    nameElem.innerHTML = array[index].name.toUpperCase();

    const imgElem = card.querySelector(`#icon-${index}`);
    imgElem.src = array[index].spriteUrl;

    const priceElem = card.querySelector(".type-collection"); //TODO skapa ett typeElem i index.html
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

document.addEventListener("click", function (event) {
  let target = event.target;

  if (target.className == "btn btn-read-more") {
    let pokemonName = target
      .closest(".card-body")
      .querySelector("h5.card-title");

    console.log(pokemonName);
    let title = pokemonName.innerText;

    showDescription(title.toLowerCase());
  }
});

async function showDescription(name) {
  const cards = document.querySelectorAll(".card");
  const cardText = document.querySelector(".card-description");
  const pokemonName = document.getElementById("pokemon-name");


  for (let card of cards) {
    const cardTitle = card.querySelector(".card-title");

    if (cardTitle.innerText.toLowerCase() === name) {
      pokemonName.innerText = cardTitle.innerText;

      cardText.innerText = await pokemon.GetPokemonDescription(name);
      console.log(cardText.innerText);
    }
  }
}
