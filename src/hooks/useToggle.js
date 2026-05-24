import { useState } from "react";

function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((currentValue) => !currentValue);
  }

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}

export default useToggle;