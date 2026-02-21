import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ").filter((x) => x !== "");
}

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();
  rl.on("line", (input) => {
    const clean = cleanInput(input);
    if (clean.length !== 0) {
      console.log(`Your command was: ${clean[0]}`);
    }
    rl.prompt();
  })
}
