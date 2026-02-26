import { type State } from "src/state.js";

export async function commandHelp(state: State) {
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
