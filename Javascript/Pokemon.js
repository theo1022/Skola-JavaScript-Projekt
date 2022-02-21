/**
 * Class to retrieve information from the PokeAPI
 */
export class Pokemon {
  /**
   * Creates the object of the class, containing parts of the URL to the PokeAPI site, as well as an array of Pokemon
   * @param {number} amount the total number of pokemon we wish to have access to
   */
  constructor(amount) {
    /**
     * @type {string} domain part of the PokeAPI URL
     */
    this.baseUrl = "https://pokeapi.co/";
    /**
     * @type {string} add a number to the string to get a specific pokemon based on the national pokedex and use as searchpath with the url. Base search path for basic information in the PokeAPI URL,
     */
    this.spritePath = "/api/v2/pokemon/";
    /**
     * @type {string} add a number to the string to get a specific pokemon based on the national pokedex and use as searchpath with the url. Base search path for description in the PokeAPI URL.
     */
    this.flavorPath = "/api/v2/pokemon-species/";

    /**
     * @type {URL} the base URL to access PokeAPI
     */
    this.url = new URL(this.baseUrl);

    /**
     * @type {Array.<{dexId: number, name: string, sprite: string, height: number, weight: number, dualType: boolean, typePrimary: string, typeSecondary: string|void}>} objects containg information about a Pokemon. Size values are  are in centimeters and grams. typeSecondary will only be defined if dualType equals true
     */
    this.pokemons = this.SetPokemonArray(amount);
  }

  /**
   * Returns an array of objects containing information about the requested amount of Pokemon.
   * @param {number} amount the total number of pokemon to store in the array
   * @returns {Array.<{dexId: number, name: string, sprite: string, height: number, weight: number, dualType: boolean, typePrimary: string, typeSecondary: string|void}>} Size values are in centimeters and grams. typeSecondary will only be defined if dualType equals true.
   */
  async SetPokemonArray(amount) {
    const localUrl = this.url;

    let pokemonObject = [];

    for (let i = 1; i < amount + 1; i++) {
      localUrl.pathname = this.spritePath + i;
      await fetch(localUrl)
        .then((response) => response.json())
        .then((object) => {
          const objectDualType = object.types.length === 2;

          let pokemon = {
            dexId: object.id,
            name: object.name,
            sprite: object.sprites.front_default,
            height: +`${object.height}0`,
            weight: object.weight,
            dualType: objectDualType,
            typePrimary: object.types[0].type.name,
          };

          if (objectDualType)
            pokemon[`typeSecondary`] = object.types[1].type.name;

          pokemonObject.push(pokemon);
          return object;
        })
        .then(() => pokemonObject.sort((a, b) => a.dexId - b.dexId));
    }
    console.log(pokemonObject); //TODO radera, enbart hjälp vid skapande av metod
    return pokemonObject;
  }

  /**
   * Reads the local objects array and returns the name of the Pokemon corresponding to the number given as an argument
   * @param {number} index the number corresponding with a Pokemon's National Pokedex id
   * @returns {string} the name of the Pokemon
   */
  GetPokeName(index) {
    //! Undefined
    const pokeName = this.pokemons[index - 1].name;
    console.log(pokeName); //TODO radera, enbart hjälp vid skapande av metod
    return pokeName;
  }

  /**
   * Reads the local objects array and returns the string form of the URL to the icon of the Pokemon corresponding to the number given as an argument
   * @param {number} index the number corresponding with a Pokemon's National Pokedex id
   * @returns {string} the string form of the URL leading to the Pokemon's icon
   */
  GetPokeIcon(index) {
    //! Undefined
    const pokeIcon = this.pokemons[index - 1].sprite;
    console.log(pokeIcon); //TODO radera, enbart hjälp vid skapande av metod
    return pokeIcon;
  }

  GetPokemonDescription(index) {
    //TODO api anrop som hämtar specifik pokemons description genom flavorPath
    //TODO returns pokemon beskrivning genom falvor_text_entries
    //Sofiia
  }
}
