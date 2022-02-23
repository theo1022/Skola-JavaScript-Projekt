import { Pokemon } from "./Pokemon.js";

const pokemon = new Pokemon();

Start(60, 6);

async function Start(dexNumberStart, amount) {
  const pokeArray = await pokemon.GetPokemonArray(dexNumberStart, amount);
  PrintPokeCard(pokeArray);
  InitiateButtons(pokeArray);
}

function PrintPokeCard(pokeArray) {
  console.log(pokeArray); //TODO radera, enbart hjälp vid skapande av metod
  const cards = document.querySelectorAll(".card-preview");
  for (let card of cards) {
    const index = card.id.slice(5, 6);
    console.log(index);

    const nameElem = card.querySelector(".card-title");
    nameElem.innerHTML = pokeArray[index].name;
    nameElem.innerHTML = pokeArray[index].name.toUpperCase();

    const dexIdElem = card.querySelector(".dex-number");
    dexIdElem.innerHTML = `National dex #${pokeArray[index].dexId}`;

    const imgElem = card.querySelector(`#icon-${index}`);
    imgElem.src = pokeArray[index].spriteUrl;

    const typeCollectionElem = card.querySelector(".type-collection");
    typeCollectionElem.innerHTML = `<div class="type ${
      pokeArray[index].typePrimary
    }">${pokeArray[index].typePrimary.toUpperCase()}</div>`;

    if (pokeArray[index].dualType) {
      typeCollectionElem.innerHTML += `<div class="type ${
        pokeArray[index].typeSecondary
      }">${pokeArray[index].typeSecondary.toUpperCase()}</div>`;
    }
  }
}

function InitiateButtons(pokeArray) {
  document.addEventListener("click", function (event) {
    let target = event.target;

    if (target.className == "btn btn-read-more") {
      let pokemonName = target
        .closest(".card-body")
        .querySelector("h5.card-title");

      console.log(pokemonName);
      let title = pokemonName.innerText;
      console.log(title);

      showDescription(title.toLowerCase(), pokeArray);
    }
  });
}

async function showDescription(name, pokeArray) {
  const cards = document.querySelectorAll(".card-preview");
  const cardText = document.querySelector(".card-description");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonImage = document.getElementById("icon-modal");
  const typeCollection = document.getElementById("pokemon-type");
  const pokemonId = document.getElementById("pokemon-id");
  const pokemonHeightandWeight = document.getElementById("pokemon-height-weight");

  for (let card of cards) {
    let index = card.id.slice(5,6);

    const cardTitle = card.querySelector(".card-title");
    const cardImage = card.querySelector(".card-img-top");
    const cardTypeCollection = card.querySelector(".type-collection");

    if (cardTitle.innerText.toLowerCase() === name) {
      
      pokemonName.innerText = cardTitle.innerText;
      pokemonId.innerHTML = "National dex # " + pokeArray[index].dexId;
      pokemonHeightandWeight.innerText = "Height: " + pokeArray[index].height + " cm" +"\n" + " Weight: " + pokeArray[index].weight + " g";
      pokemonImage.src = cardImage.src;
      typeCollection.innerHTML = cardTypeCollection.innerHTML;
      
      cardText.innerHTML = await pokemon.GetPokemonDescription(name);
      
      cardText.innerHTML = cardText.innerHTML.replaceAll("\u000C", " ");
     
      console.log(cardText.innerHTML);
      
    }
  }
}
