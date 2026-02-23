import { type State } from "src/state.js";
import { getCommands } from "./index.js"

export function commandHelp(state: State) {
  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();

  const { commands } = state
  
  for (const command of Object.values(commands)) {
    console.log(`${command.name}: ${command.description}`);
  }

  console.log();
};