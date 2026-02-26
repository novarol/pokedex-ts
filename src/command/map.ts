import { type ShallowLocations } from "src/pokeapi.js";
import { type State } from "src/state.js";

export async function commandMapForward (state: State) {
  if (state.prevLocationsURL && !state.nextLocationsURL) {
    throw new Error("you're on the last page");
  }

  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL) as ShallowLocations

  state.nextLocationsURL = locations.next || "";
  state.prevLocationsURL = locations.previous || "";

  for (const location of locations.results) {
    console.log(location.name);
  }
}

export async function commandMapBack (state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("you're on the first page");
  }
  
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL) as ShallowLocations

  state.nextLocationsURL = locations.next || "";
  state.prevLocationsURL = locations.previous || "";

  for (const location of locations.results) {
    console.log(location.name);
  }
}
