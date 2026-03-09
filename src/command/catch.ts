import { type State } from "src/state.js";

export async function commandCatch (state: State, ...args: string[]) {
  const pokemonName = args.shift();

  if (!pokemonName) {
    throw new Error("you didn't provide a pokemon name");
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

  const isCaught = tryCatch(pokemon.base_experience);

  if (!isCaught) {
    console.log(`${pokemonName} escaped!`);
    return;
  }

  console.log(`${pokemonName} was caught!`);
  state.pokedex[pokemonName] = pokemon;

  console.log("You may now inspect it with the inspect command.")
}

function tryCatch (baseExperience: number) {
  return Math.random() < 100 / (baseExperience + 100);
}