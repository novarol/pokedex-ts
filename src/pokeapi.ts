import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache: Cache;

  constructor(cacheInterval: number) {
    this.#cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations | void> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;

    const cachedResponse = this.#cache.get<ShallowLocations>(url);

    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const locations: ShallowLocations = await response.json();

      this.#cache.add<ShallowLocations>(url, locations)

      return locations;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`An error occured fetching locations: ${error.message}`);
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cachedResponse = this.#cache.get<Location>(url);

    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const location: Location = await response.json();

      this.#cache.add<Location>(url, location)

      return location;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`An error occured fetching location: ${error.message}`);
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
