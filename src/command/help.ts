import { getCommands } from "./index.js"

export function commandHelp() {
  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();

  const commands = getCommands();
  
  for (const command of Object.values(commands)) {
    console.log(`${command.name}: ${command.description}`);
  }

  console.log();
};