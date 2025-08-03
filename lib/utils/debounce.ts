type Callback = (...args: any[]) => void;

export const debounce = <T extends any[]>(fn: (...args: T) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};