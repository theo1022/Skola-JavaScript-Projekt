import { Pokemon } from "./Pokemon.js";

const pokemon = new Pokemon();

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
  const respontest = await pokemon.GetPokemonDescription(name);

  for (let card of cards) {
    const cardTitle = card.querySelector(".card-title");
    //card-title ska ändras mot card-description när modal ska skapas
    const cardText = card.querySelector(".card-text");

    if (cardTitle.innerText.toLowerCase() === name) {
      console.log(cardTitle.innerText);
      console.log(cardTitle.id);

      cardText.innerText = respontest;
      console.log(cardText.innerText);
    }
  }
}
