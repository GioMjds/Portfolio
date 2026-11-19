import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * `false` during SSR and hydration, `true` on the client afterwards.
 * Replaces the `useEffect(() => setMounted(true), [])` pattern, which the
 * React Compiler lint rules reject.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
