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
  const cardText = document.querySelector(".card-description");
  const pokemonName = document.getElementById("pokemon-name");
  //const respontest = ;

  for (let card of cards) {
    const cardTitle = card.querySelector(".card-title");

    if (cardTitle.innerText.toLowerCase() === name) {
      pokemonName.innerText = cardTitle.innerText;

      cardText.innerText = await pokemon.GetPokemonDescription(name);
      console.log(cardText.innerText);
    }
  }
}
