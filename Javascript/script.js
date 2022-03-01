import { Pokemon } from "./Pokemon.js";

const pokemon = new Pokemon();

PageSetup();

function PageSetup() {
  let pageNumberOnStart = localStorage.getItem("pageNumber");
  if (pageNumberOnStart === null) pageNumberOnStart = 1;
  document.querySelector("#nav-number-0 > a").innerHTML = pageNumberOnStart;
  InitiatePagination();

  Start(GetDexNumber(pageNumberOnStart), 6);
}

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
    nameElem.innerHTML = pokeArray[index].name.toUpperCase();

    const dexIdElem = card.querySelector(".dex-number");
    dexIdElem.innerHTML = `National dex #${pokeArray[index].dexId}`;

    const imgElem = card.querySelector(`#icon-${index}`);
    imgElem.src = pokeArray[index].spriteUrl;
    imgElem.alt = nameElem.innerHTML + " official artwork";

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

      showDescription(title.toLowerCase());
    }
  });
}

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

//TODO lägg till en maxgräns för när knappen inte längre ska göra något
//TODO melmetal #809 är sista pokemon i gen 7. Api:n säger själv att gen 8 kan ha buggar. Sätt stopp så inga pokemon efter #809 kan hämtas ut? (sida 135)
function LoadNewBatch(direction) {
  const currentPageElem = document.querySelector("#nav-number-0 > a");
  const currentPageNumber =
    +document.querySelector("#nav-number-0 > a").innerHTML;

  if (direction === "previous" && currentPageNumber === 1) return;

  let newPageNumber = currentPageNumber;

  if (direction === "next") newPageNumber++;
  if (direction === "previous") newPageNumber--;

  const dexNumberStart = GetDexNumber(newPageNumber);

  Start(dexNumberStart, 6);
  currentPageElem.innerHTML = newPageNumber;
  localStorage.setItem("pageNumber", newPageNumber);
}

function GetDexNumber(number) {
  console.log("GetStart number param = " + number);
  const index = number * 6 - 5;
  console.log("GetStart return = " + index);
  return index;
}

function InitiatePagination() {
  const navNextElem = document.getElementById("nav-next");
  navNextElem.onclick = function () {
    LoadNewBatch("next");
  };

  const navPreviousElem = document.getElementById("nav-previous");
  navPreviousElem.onclick = function () {
    LoadNewBatch("previous");
  };
}
