import { type State } from "src/state.js";

export async function commandInspect (state: State, ...args: string[]) {
  const pokemonName = args.shift();

  if (!pokemonName) {
    throw new Error("you didn't provide a pokemon name");
  }

  const pokemon = state.pokedex[pokemonName]

  if (!pokemon) {
    throw new Error("you have not caught that pokemon yet");
  }

  console.log("Name:", pokemon.name);
  console.log("Height:", pokemon.height);
  console.log("Weight:", pokemon.weight);
  console.log("Stats:")
  for (const stat of pokemon.stats) {
    console.log(`  - ${stat.stat.name}:`, stat.base_stat);
  }
  console.log("Types:");
  for (const type of pokemon.types) {
    console.log(`  - ${type.type.name}`);
  }  
}
