import { exit } from "node:process";
import { type State } from "src/state.js";

export function commandExit(state: State) {
  const { readline } = state;
  console.log("Closing the Pokedex... Goodbye!");
  readline.close();
  exit(0);
};