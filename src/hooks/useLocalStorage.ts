import { useState } from "react";

function getStoredValue<T>(key: string, initialValue: T): T {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return initialValue;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return initialValue;
  }
}

type UseLocalStorageReturn<T> = {
  value: T;
  setValue: (newValue: T) => void;
  removeValue: () => void;
};

function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [value, setValueState] = useState<T>(() => {
    return getStoredValue(key, initialValue);
  });

  function setValue(newValue: T) {
    setValueState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  function removeValue() {
    setValueState(initialValue);
    localStorage.removeItem(key);
  }

  return {
    value,
    setValue,
    removeValue,
  };
}

export default useLocalStorage;