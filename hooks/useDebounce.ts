import { useRef } from "react";

export const useDebounce = () => {
  const debounceTimeoutRef = useRef<any>(null);

  return function(callback: any, delay: number) {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(callback, delay);
  };
};
