import type { CLICommand } from "src/state.js";
import { commandCatch } from "./catch.js";
import { commandExit } from "./exit.js";
import { commandExplore } from "./explore.js";
import { commandHelp } from "./help.js";
import { commandInspect } from "./inspect.js";
import { commandMapBack, commandMapForward } from "./map.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore <location-name>",
      description: "Find Pokemon at location",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon-name>",
      description: "Attempt to catch Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon-name>",
      description: "Look up Pokemon in the Pokedex",
      callback: commandInspect,
    },
  };
}
