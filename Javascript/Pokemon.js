/**
 * Class to retrieve information from the PokeAPI
 */
export class Pokemon {
  /**
   * Creates the object of the class, containing parts of the URL to the PokeAPI site
   */
  constructor() {
    /**
     * domain part of the PokeAPI URL
     * @type {string}
     */
    this.baseUrl = "https://pokeapi.co/";
    /**
     * add a number to the string to get a specific pokemon based on the national pokedex and use as searchpath with the url. Base search path for basic information in the PokeAPI URL
     * @type {string}
     */
    this.spritePath = "/api/v2/pokemon/";
    /**
     * add a number to the string to get a specific pokemon based on the national pokedex and use as searchpath with the url. Base search path for description in the PokeAPI URL.
     * @type {string}
     */
    this.flavorPath = "/api/v2/pokemon-species/";

    /**
     * the base URL to access PokeAPI
     * @type {URL}
     */
    this.url = new URL(this.baseUrl);
  }

  /**
   * Returns an array of objects containing information about the requested amount of Pokemon.
   * @param {number} dexNumberStart the number of a desired Pokemon in the National Pokedex - this Pokemon will be the first instance in the array
   * @param {number} amount the total number of Pokemon to store in the array - will be counting up along the National Pokedex from the number set as dexNumberStart
   * @returns {Array.<{dexId: number, name: string, spriteUrl: string, height: number, weight: number, dualType: boolean, typePrimary: string, typeSecondary: string|void}>} Array of objects containing base information about a Pokemon. Size values are in centimeters and grams. typeSecondary will only be defined if dualType equals true.
   */
  async GetPokemonArray(dexNumberStart, amount) {
    const localUrl = this.url;

    let pokemonObject = [];

    for (let i = 0; pokemonObject.length < amount - 1 + 1; i++) {
      localUrl.pathname = this.spritePath + (dexNumberStart + i);

      let response = await fetch(localUrl);

      const object = await response.json();

      const objectDualType = object.types.length === 2;

      let pokemon = {
        dexId: object.id,
        name: object.species.name,
        spriteUrl: object.sprites.other["official-artwork"].front_default,
        height: object.height * 10,
        weight: object.weight * 100,
        dualType: objectDualType,
        typePrimary: object.types[0].type.name,
      };

      if (objectDualType) pokemon[`typeSecondary`] = object.types[1].type.name;

      pokemonObject.push(pokemon);
    }
    return pokemonObject;
  }

  /**
   *
   * @param {string} index -the name of chosen pokemon which complete the pathname for api-url
   * @returns {string} returns a string with flavor-text for chosen pokemon based on pokemon name
   */

  async GetPokemonDescription(index) {
    this.url.pathname = this.flavorPath + index;

    let response = await fetch(this.url);

    let description = await response.json();

    let pokemonDescription = description.flavor_text_entries;
    let pokemonDescriptionText;

    for (let i = 0; i < pokemonDescription.length; i++) {
      if (pokemonDescription[i].language.name === "en") {
        pokemonDescriptionText = pokemonDescription[i].flavor_text;
      }
    }

    return pokemonDescriptionText;
  }

  addToCart(title, image) {
    let storage = JSON.parse(localStorage.getItem("cartArray"));
    let cartArray;

    if (storage === null) {
      cartArray = [];
    } else {
      cartArray = storage;
    }
    let pokemonCart = {
      name: title,
      img: image,
    };

    cartArray.push(pokemonCart);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
  }

  deleteFromCart(id) {
    let storage = JSON.parse(localStorage.getItem("cartArray"));

    storage.splice(id, 1);
    localStorage.setItem("cartArray", JSON.stringify(storage));
  }
}
