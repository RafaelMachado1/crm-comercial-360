export function getStorageItem<T>(key: string, fallback: T): T {
  const item = localStorage.getItem(key);

  if (!item) {
    return fallback;
  }

  try {
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}