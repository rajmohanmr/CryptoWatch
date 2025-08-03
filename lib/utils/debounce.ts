export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
