import { useCallback } from 'react';
import throttle from 'lodash.throttle';

export function useThrottle<M extends (...args: any) => any>(
  { method, delay = 500 }: { method: M; delay?: number },
  dependencyList: unknown[] = []
) {
  return useCallback(throttle(method, delay), dependencyList);
}
