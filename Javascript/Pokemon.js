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
     * @type {string} base search path for basic information in the PokeAPI URL
     */
    this.spritePath = "/api/v2/pokemon/";
    /**
     * @type {string} base search path for description in the PokeAPI URL
     */
    this.flavorPath = "/api/v2/pokemon-species/";

    /**
     * @type {URL} the base URL to access PokeAPI
     */
    this.url = new URL(this.baseUrl);

    /**
     * @type {Array.<{dexId: number, name: string, icon: URL}>} objects containg the dexId, name, and icon(URL) of a specific pokemon per given index
     */
    this.pokemons = this.SetPokemonArray(amount);
  }

  /**
   * Returns an array of objects containing the National Pokedex id, name, and url to the front spire of a Pokemon starting from Pokedex id 1 and up to whichever Pokedex number is given as an argument.
   * @param {number} amount the total number of pokemon to store in the array
   * @returns {Array.<number, string, URL>} dexId, name, and icon of the pokemon as objects in an array
   */
  SetPokemonArray(amount) {
    const url = this.url;

    let pokemonObject = [];

    //! BUG Pokemon hamnar inte i rätt ordning enligt deras Pokedex id
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
        });
    }
    console.log(pokemonObject); //TODO radera, enbart hjälp vid skapande av metod
    return pokemonObject;
  }

  GetPokeName(index) {
    //TODO hämta name från pokemons array
    //Theo
  }

  GetPokeIcon(index) {
    //TODO hämta sprite från pokemons array
    //Theo
  }

  GetPokemonDescription(index) {
    //TODO api anrop som hämtar specifik pokemons description genom flavorPath
    //TODO returns pokemon beskrivning genom falvor_text_entries
    //Sofiia
  }
}
