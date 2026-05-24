import { useState } from "react";

function getStoredValue(key, initialValue) {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return initialValue;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    return initialValue;
  }
}

function useLocalStorage(key, initialValue) {
  const [value, setValueState] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  function setValue(newValue) {
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