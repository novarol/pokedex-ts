import { type State } from "src/state.js";

export async function commandPokedex (state: State, ...args: string[]) {
  const pokemon = Object.values(state.pokedex);

  if (!pokemon.length) {
    throw new Error("you haven't caught any pokemon yet");
  }
  
  console.log("Your Pokedex:")
  for (const {name} of pokemon) {
    console.log(`  - ${name}`);
  }
}
