export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;

    this.#startReapLoop();
  }

  #reap() {
    this.#cache.forEach((value, key, map) => {
      if (value.createdAt < Date.now() - this.#interval) {
        map.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
    this.#cache.clear();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }
}