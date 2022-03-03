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


async function showDescription(name, pokeArray) {
  const cards = document.querySelectorAll(".card-preview");
  const cardText = document.querySelector(".card-description");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonImage = document.getElementById("icon-modal");
  const typeCollection = document.getElementById("pokemon-type");
  const pokemonId = document.getElementById("pokemon-id");
  const pokemonHeightandWeight = document.getElementById(
    "pokemon-height-weight"
  );

  for (let card of cards) {
    let index = card.id.slice(5, 6);

    const cardTitle = card.querySelector(".card-title");
    const cardImage = card.querySelector(".card-img-top");
    const cardTypeCollection = card.querySelector(".type-collection");

    if (cardTitle.innerText.toLowerCase() === name) {
      pokemonName.innerText = cardTitle.innerText;
      pokemonId.innerHTML = "National dex # " + pokeArray[index].dexId;
      pokemonHeightandWeight.innerText =
        "Height: " +
        pokeArray[index].height +
        " cm" +
        "\n" +
        " Weight: " +
        pokeArray[index].weight +
        " g";
      pokemonImage.src = cardImage.src;
      typeCollection.innerHTML = cardTypeCollection.innerHTML;

      cardText.innerHTML = await pokemon.GetPokemonDescription(name);

      cardText.innerHTML = cardText.innerHTML.replaceAll("\u000C", " ");

      console.log(cardText.innerHTML);
    }
  }
}

function createCart() {
  const collapse = document.getElementById("collapse-section");
  collapse.innerHTML = "";

  const divCollapse = document.createElement("div");
  divCollapse.className = "collapse collapse-horisontal";
  divCollapse.id = "collapse-cart";

  const divCardBody = document.createElement("div");
  divCardBody.className = "card card-body";

  let storage = JSON.parse(localStorage.getItem("cartArray"));

  for (let i = 0; i < storage.length; i++) {
    const divWrapper = document.createElement("div");
    divWrapper.className = "wrapper-cart";

    const divButton = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-x-square";

    const collapseImg = document.createElement("img");
    collapseImg.className = "collapse-image";
    collapseImg.src = storage[i].img;

    const divTitle = document.createElement("div");
    divTitle.className = "title-pokemonname";

    const collapseTitle = document.createElement("h5");
    collapseTitle.className = "pokemon-title";
    collapseTitle.innerText = storage[i].name;
    collapseTitle.id = i;

    const readMoreDiv = document.createElement("div");
    const readMoreBtn = document.createElement("button");
    readMoreBtn.innerText = "Read more";

    divButton.append(deleteBtn);
    deleteBtn.append(deleteIcon);
    divWrapper.append(collapseImg);
    divTitle.append(collapseTitle);
    divWrapper.append(divTitle);
    divWrapper.append(divButton);
    divWrapper.append(readMoreDiv);
    divCardBody.append(divWrapper);
    divCollapse.append(divCardBody);

    collapse.append(divCollapse);
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

document.addEventListener("click", function (event) {
  let target = event.target;

  if (target.className == "btn btn-add-to-cart") {
    const cardPreview = target.closest(".card");
    const cardImage = cardPreview.querySelector("img").src;
    console.log(cardImage);
    const cardTitle = cardPreview.querySelector(".card-title").innerText;
    let storage = JSON.parse(localStorage.getItem("cartArray"));
   

    if ( storage === null || storage.length != 6 ) {
      pokemon.addToCart(cardTitle, cardImage);
      createCart();
    } else {
      alert("Limit is 6 cards");
    }

 
  }
  if(target.className === "bi bi-cart-fill"){
    const collapseSection = document.querySelector("#collapse-section");
    const cartButton = document.querySelector("#cart-btn");
    let storage = JSON.parse(localStorage.getItem("cartArray"));
/*
    if (storage != null) {
      createCart();
      console.log(storage);
    }
 
    if(collapseSection.innerHTML === ""){
      alert("Cart is empty!");
    }
    
   */


    
  }
  if (target.className != "bi bi-x-square") {
    return;
  }
  let collapseContainer = target.closest(".wrapper-cart");
  console.log(collapseContainer);

  let getTitle = collapseContainer.querySelector("h5.pokemon-title").id;

  collapseContainer.remove();
  pokemon.deleteFromCart(getTitle);
  createCart();

});




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
