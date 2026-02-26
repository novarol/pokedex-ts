import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ").filter((x) => x !== "");
}

export async function startREPL(state: State) {
  const { readline, commands } = state;

  readline.prompt();

  readline.on("line", async (input) => {
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
      await command.callback(state);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An error occured:", error);
      }
    }

    readline.prompt();
  })
}
