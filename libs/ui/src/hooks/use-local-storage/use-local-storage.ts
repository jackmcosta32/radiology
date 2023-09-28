import { Dispatch, useState } from 'react';
import { isServerSide } from '../../utils/server-side/is-server-side';

export function useLocalStorage<Value>(key: string, initialValue?: Value) {
  const [storedValue, setStoredValue] = useState(() => {
    if (isServerSide()) {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: Value) => {
    let valueToStore = value;

    if (typeof value === 'function') {
      valueToStore = value();
    }

    setStoredValue(valueToStore);

    if (isServerSide()) return;

    const stringifyedValue = JSON.stringify(valueToStore);

    window.localStorage.setItem(key, stringifyedValue);
  };

  return [
    storedValue as Value | undefined,
    setValue as Dispatch<Value>,
  ] as const;
}
