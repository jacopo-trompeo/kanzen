import { debounce } from "radash";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_DELAY = 500;

interface UseDebouncedStateOptions<T> {
  delay?: number;
  onUpdate?: (value: T) => void;
}

export function useDebouncedState<T>(
  value: T,
  options: UseDebouncedStateOptions<T>,
) {
  const { delay = DEFAULT_DELAY, onUpdate } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  function setValue(newValue: T) {
    setDebouncedValue(newValue);
    debouncedUpdate(newValue);
  }

  const debouncedUpdate = useCallback(
    debounce({ delay }, (newValue: T) => {
      onUpdateRef.current?.(newValue);
    }),
    [],
  );

  return [debouncedValue, setValue] as const;
}
