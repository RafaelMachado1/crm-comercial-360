import { useState } from "react";

type UseToggleReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function useToggle(initialValue = false): UseToggleReturn {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

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