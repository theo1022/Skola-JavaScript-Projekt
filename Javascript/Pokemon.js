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

    for (let i = 0; i < amount - 1 + 1; i++) {
      localUrl.pathname = this.spritePath + (dexNumberStart + i);

      await fetch(localUrl)
        .then((response) => response.json())
        .then((object) => {
          const objectDualType = object.types.length === 2;

          let pokemon = {
            dexId: object.id,
            name: object.name,
            spriteUrl: object.sprites.front_default,
            height: object.height * 10,
            weight: object.weight * 100,
            dualType: objectDualType,
            typePrimary: object.types[0].type.name,
          };

          if (objectDualType)
            pokemon[`typeSecondary`] = object.types[1].type.name;

          pokemonObject.push(pokemon);
          return object;
        });
    }

    pokemonObject.sort((a, b) => a.dexId - b.dexId);
    console.log(pokemonObject); //TODO radera, enbart hjälp vid skapande av metod
    return pokemonObject;
  }

  GetPokemonDescription(index) {
    //TODO api anrop som hämtar specifik pokemons description genom flavorPath
    //TODO returns pokemon beskrivning genom falvor_text_entries
    //Sofiia
  }
}
