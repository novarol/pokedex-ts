import { commandExit } from "./exit.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: () => void;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    // can add more commands here
  };
}
