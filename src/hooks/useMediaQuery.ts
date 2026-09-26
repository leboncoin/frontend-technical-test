import { useEffect, useState } from 'react'

/**
 * Minimal matchMedia hook (no dependency needed).
 *
 * Used for focus management when the responsive layout hides a pane: CSS
 * decides visibility, JS only needs to know where to move focus.
 * Returns false on the server and during the first client render, then
 * synchronizes — the components using it degrade to a no-op.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    setMatches(mediaQueryList.matches)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQueryList.addEventListener('change', onChange)
    return () => mediaQueryList.removeEventListener('change', onChange)
  }, [query])

  return matches
}
