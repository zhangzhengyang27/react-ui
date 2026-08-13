import { useRef } from 'react'
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect'

export interface UseDocumentTitleOptions {
    /** Whether to restore the previous document title when the component unmounts @default false */
    restoreOnUnmount?: boolean
}

/**
 * Sets the document title. Optionally restores the previous title on unmount.
 *
 * @param title - The title to set. Empty or whitespace-only strings are ignored.
 * @param options - Configuration options.
 *
 * @example
 * // Basic usage
 * useDocumentTitle('My Page Title')
 *
 * @example
 * // Restore original title on unmount (useful for temporary title changes)
 * useDocumentTitle('Temporary Title', { restoreOnUnmount: true })
 */
export function useDocumentTitle(title: string, options?: UseDocumentTitleOptions) {
    const { restoreOnUnmount = false } = options || {}
    const previousTitleRef = useRef<string | null>(null)

    useIsomorphicEffect(() => {
        if (typeof title === 'string' && title.trim().length > 0) {
            // Capture the title before the first modification so it can be restored later
            if (previousTitleRef.current === null) {
                previousTitleRef.current = document.title
            }
            document.title = title.trim()
        }
    }, [title])

    useIsomorphicEffect(() => {
        return () => {
            if (restoreOnUnmount && previousTitleRef.current !== null) {
                document.title = previousTitleRef.current
            }
        }
    }, [restoreOnUnmount])
}
