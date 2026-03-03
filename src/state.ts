import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command/index.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState (cacheInterval: number): State {
  const readline = createInterface({
      input: stdin,
      output: stdout,
      prompt: "Pokedex > ",
    });

  const commands = getCommands();

  return {
    readline,
    commands,
    pokeAPI: new PokeAPI(cacheInterval),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}