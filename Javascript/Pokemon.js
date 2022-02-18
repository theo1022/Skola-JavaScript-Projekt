export class Pokemon {
  constructor() {
    this.baseUrl = "https://pokeapi.co/";
    this.spritePath = "/api/v2/pokemon/";
    this.flavorPath = "/api/v2/pokemon-species/";

    this.url = new URL(this.baseUrl);

    this.pokemons = this.GetAllPokemon(); //TODO Lagra enbart name och sprite
  }

  GetAllPokemon() {
    //TODO api anrop som lagrar pokemon namn och sprite i en array till konstruktorn genom spritePath
    //Theo
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
