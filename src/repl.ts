import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
import { getCommands } from "./command/index.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ").filter((x) => x !== "");
}

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();

  rl.prompt();
  rl.on("line", (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (!command) {
      console.log(`Unknown command: ${commandName}`);
      rl.prompt();
      return;
    }

    try {
      command.callback();
    } catch (error) {
      console.log("An error occured:", error);
    }

    rl.prompt();
  })
}
