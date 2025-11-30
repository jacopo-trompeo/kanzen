import { createClientOnlyFn } from "@tanstack/react-start";

export const getFromLocalStorage = createClientOnlyFn(
  <T = unknown>(key: string, defaultValue: T | null = null): T | null => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
);

export const setToLocalStorage = createClientOnlyFn(
  <T = unknown>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
);
