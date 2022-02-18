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
     * @type {Array.<{dexId: number, name: string, icon: string}>} objects containg the dexId, name, and the string form of the URL leading to the icon of a specific pokemon per given index
     */
    this.pokemons = this.SetPokemonArray(amount);
  }

  /**
   * Returns an array of objects containing the National Pokedex id, name, and url to the front spire of a Pokemon starting from Pokedex id 1 and up to whichever Pokedex number is given as an argument.
   * @param {number} amount the total number of pokemon to store in the array
   * @returns {Array.<{dexId: number, name: string, icon: string}>} dexId, name, and the string form of the URL leading to the Pokemon's icon as objects in an array
   */
  SetPokemonArray(amount) {
    const url = this.url;

    let pokemonObject = [];

    for (let i = 1; i < amount + 1; i++) {
      url.pathname = this.spritePath + i;
      fetch(url)
        .then((response) => response.json())
        .then((object) => {
          pokemonObject.push({
            dexId: object.id,
            name: object.name,
            icon: object.sprites.front_default,
          });
          return object;
        })
        .then(() =>
          //! sorteringen fungerar fortfarande inte som den ska
          pokemonObject.sort((a, b) => {
            a.dexId - b.dexId;
          })
        );
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
    const pokeIcon = this.pokemons[index - 1].icon;
    console.log(pokeIcon); //TODO radera, enbart hjälp vid skapande av metod
    return pokeIcon;
  }

  GetPokemonDescription(index) {
    //TODO api anrop som hämtar specifik pokemons description genom flavorPath
    //TODO returns pokemon beskrivning genom falvor_text_entries
    //Sofiia
  }
}
