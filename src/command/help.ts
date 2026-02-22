import { getCommands } from "./index.js"

export function commandHelp() {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  const commands = getCommands();
  for (const command of Object.values(commands)) {
    console.log(`${command.name}: ${command.description}`)
  }
};