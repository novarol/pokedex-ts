import { type State } from "src/state.js";

export async function commandExplore (state: State, ...args: string[]) {
  const locationName = args.shift();
  
  if (!locationName) {
    throw new Error("you didn't provide a location name");
  }

  console.log(`Exploring ${locationName}...`);

  const location = await state.pokeAPI.fetchLocation(locationName);
  
  const encounters = location.pokemon_encounters;
  if (encounters.length) {
    console.log("Found Pokemon:");
    for (const encounter of encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }
  }
}
