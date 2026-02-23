import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ").filter((x) => x !== "");
}

export function startREPL(state: State) {
  const { readline, commands } = state;

  readline.prompt();

  readline.on("line", (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      readline.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (!command) {
      console.log(`Unknown command: ${commandName}`);
      readline.prompt();
      return;
    }

    try {
      command.callback(state);
    } catch (error) {
      console.log("An error occured:", error);
    }

    readline.prompt();
  })
}
