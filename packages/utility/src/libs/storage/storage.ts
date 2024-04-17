export type StorageType = 'localStorage' | 'sessionStorage';

export function createStorage<T extends object>(type: StorageType) {
  const stg =
    type === 'sessionStorage' ? window.sessionStorage : window.localStorage;

  const storage = {
    set<K extends keyof T & string>(key: K, value: T[K]) {
      const json = JSON.stringify(value);

      stg.setItem(key, json);
    },
    get<K extends keyof T & string>(key: K, defaultValue: T[K]): T[K] {
      const json = stg.getItem(key);
      if (json) {
        let storageData: T[K] | null = null;

        try {
          storageData = JSON.parse(json);
        } catch {
          storageData = defaultValue;
        }

        if (storageData) {
          return storageData as T[K];
        }
      }

      stg.removeItem(key);

      return defaultValue;
    },
    remove(key: keyof T & string) {
      stg.removeItem(key);
    },
    clear() {
      stg.clear();
    }
  };

  return storage;
}
