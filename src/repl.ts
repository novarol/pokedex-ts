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
    const clean = cleanInput(input);
    if (clean.length !== 0) {
      if (commands.hasOwnProperty(clean[0])) {
        try {
          commands[clean[0]].callback();
        } catch (error) {
          console.log("An error occured:", error);
        }
      } else {
        console.log("Unknown command")
      }
    }
    rl.prompt();
  })
}
