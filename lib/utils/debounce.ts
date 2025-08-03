type Callback = (...args: any[]) => void;

export const debounce = (fn: Callback, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};