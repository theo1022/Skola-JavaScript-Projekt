import { Pokemon } from "./Pokemon.js";

const pokemon = new Pokemon();

PageSetup();

function PageSetup() {
  let pageNumberOnStart = localStorage.getItem("pageNumber");
  if (pageNumberOnStart === null) pageNumberOnStart = 1;

  UppdatePagination(pageNumberOnStart);
  InitiatePagination();

  Start(GetDexNumber(pageNumberOnStart), 6);
}

async function Start(dexNumberStart, amount) {
  const pokeArray = await pokemon.GetPokemonArray(dexNumberStart, amount);
  PrintPokeCard(pokeArray);
  InitiateButtons(pokeArray);
}

function PrintPokeCard(pokeArray) {
  const cards = document.querySelectorAll(".card-preview");

  for (let card of cards) {
    const index = card.id.slice(5, 6);

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
  divCollapse.className = "collapse.show collapse-horisontal";
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
    divTitle.className = "title-img-warpper";

    const collapseTitle = document.createElement("h5");
    collapseTitle.className = "pokemon-title";
    collapseTitle.innerText = storage[i].name;
    collapseTitle.id = i;

    const readMoreDiv = document.createElement("div");
    readMoreDiv.className = "button-wrapper";
    const readMoreBtn = document.createElement("a");
    readMoreBtn.className = "btn btn-read-more-cart";
    readMoreBtn.innerText = "Read more";
    readMoreBtn.setAttribute("data-bs-toggle", "modal");
    readMoreBtn.setAttribute("data-bs-target", "#card-modal");

    readMoreDiv.append(readMoreBtn);
    divButton.append(deleteBtn);
    deleteBtn.append(deleteIcon);
    divTitle.append(collapseImg);
    divTitle.append(collapseTitle);
    divTitle.append(deleteBtn);
    divWrapper.append(divTitle);
    // divWrapper.append(divButton);
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
      let title = pokemonName.innerText;

      showDescription(title.toLowerCase(), pokeArray);
    }
    if (target.className === "btn btn-read-more-cart") {
      let pokemonName = target
        .closest(".wrapper-cart")
        .querySelector("h5.pokemon-title");
      console.log(pokemonName);
      let title = pokemonName.innerText;

      showDescription(title.toLowerCase(), pokeArray);
    }
  });
}

document.addEventListener("click", function (event) {
  let target = event.target;

  if (target.className == "btn btn-add-to-cart") {
    const cardPreview = target.closest(".card");
    const cardImage = cardPreview.querySelector("img").src;
    const cardTitle = cardPreview.querySelector(".card-title").innerText;
    let storage = JSON.parse(localStorage.getItem("cartArray"));

    if (storage === null || storage.length != 6) {
      pokemon.addToCart(cardTitle, cardImage);
      createCart();
    } else {
      alert("Limit is 6 cards");
    }
  }
  if (target.className === "bi bi-cart-fill") {
    const collapseSection = document.querySelector("#collapse-section");
    let storage = JSON.parse(localStorage.getItem("cartArray"));

    if (storage != null) {
      createCart();
    }

    if (collapseSection.innerHTML === "") {
      alert("Cart is empty!");
    }
  }
  if (target.className != "bi bi-x-square") {
    return;
  }
  let collapseContainer = target.closest(".wrapper-cart");
  let getTitle = collapseContainer.querySelector("h5.pokemon-title").id;

  collapseContainer.remove();
  pokemon.deleteFromCart(getTitle);
  createCart();
});

function LoadNewBatch(direction, steps) {
  const currentPageNumber =
    +document.querySelector("#nav-current > a").innerHTML;

  if (
    ((direction === "previous" || direction === "first") &&
      currentPageNumber === 1) ||
    ((direction === "next" || direction === "last") &&
      currentPageNumber === 135)
  )
    return;

  let newPageNumber = currentPageNumber;

  if (direction === "first") newPageNumber = 1;
  if (direction === "next") newPageNumber++;
  if (direction === "previous") newPageNumber--;
  if (direction === "last") newPageNumber = 135;
  if (direction == "step") newPageNumber += +steps;

  const dexNumberStart = GetDexNumber(newPageNumber);

  Start(dexNumberStart, 6);
  localStorage.setItem("pageNumber", newPageNumber);

  UppdatePagination(newPageNumber);
}

function UppdatePagination(currentPage) {
  const minus3Elem = document.querySelector("#nav-minus-3 > a");
  const minus2Elem = document.querySelector("#nav-minus-2 > a");
  const minus1Elem = document.querySelector("#nav-minus-1 > a");
  const currentElem = document.querySelector("#nav-current > a");
  const plus1Elem = document.querySelector("#nav-plus-1 > a");
  const plus2Elem = document.querySelector("#nav-plus-2 > a");
  const plus3Elem = document.querySelector("#nav-plus-3 > a");

  minus3Elem.innerHTML = +currentPage - 3;
  minus2Elem.innerHTML = +currentPage - 2;
  minus1Elem.innerHTML = +currentPage - 1;
  currentElem.innerHTML = +currentPage;
  plus1Elem.innerHTML = +currentPage + 1;
  plus2Elem.innerHTML = +currentPage + 2;
  plus3Elem.innerHTML = +currentPage + 3;

  //TODO bryt ut till egen funktion som tar in element eller gör till loop???
  if (minus3Elem.innerHTML < 1) {
    minus3Elem.classList.add("hide-element");
  } else {
    minus3Elem.classList.remove("hide-element");
  }

  if (minus2Elem.innerHTML < 1) {
    minus2Elem.classList.add("hide-element");
  } else {
    minus2Elem.classList.remove("hide-element");
  }

  if (minus1Elem.innerHTML < 1) {
    minus1Elem.classList.add("hide-element");
  } else {
    minus1Elem.classList.remove("hide-element");
  }
  if (plus1Elem.innerHTML > 135) {
    plus1Elem.classList.add("hide-element");
  } else {
    plus1Elem.classList.remove("hide-element");
  }

  if (plus2Elem.innerHTML > 135) {
    plus2Elem.classList.add("hide-element");
  } else {
    plus2Elem.classList.remove("hide-element");
  }

  if (plus3Elem.innerHTML > 135) {
    plus3Elem.classList.add("hide-element");
  } else {
    plus3Elem.classList.remove("hide-element");
  }
}

function GetDexNumber(number) {
  const index = number * 6 - 5;

  return index;
}

function InitiatePagination() {
  document.getElementById("nav-first").onclick = function () {
    LoadNewBatch("first");
  };

  document.getElementById("nav-previous").onclick = function () {
    LoadNewBatch("previous");
  };

  document.getElementById("nav-next").onclick = function () {
    LoadNewBatch("next");
  };

  document.getElementById("nav-last").onclick = function () {
    LoadNewBatch("last");
  };

  const pageNumbers = document.querySelectorAll(".page-number");

  for (let number of pageNumbers) {
    number.addEventListener("click", function (clickedElem) {
      const currentPage = +document.querySelector("#nav-current > a").innerHTML;
      const clickedPage = +clickedElem.target.closest(".page-link").innerHTML;
      const steps = clickedPage - currentPage;

      LoadNewBatch("step", steps);
    });
  }
}
