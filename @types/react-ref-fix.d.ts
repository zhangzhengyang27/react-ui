import * as React from 'react'

/**
 * React 19 (and strict React 18) types make `useRef<T>(null)` return a readonly
 * `RefObject<T>`, which breaks the common pattern of using refs as mutable
 * containers. This augmentation restores the mutable behavior for all
 * `useRef` overloads so existing hook/component code can assign to `.current`.
 *
 * Note: `MutableRefObject<T>` is assignable wherever `RefObject<T>` is expected,
 * so passing these refs to DOM/component `ref` props remains type-safe.
 */
declare module 'react' {
    function useRef<T>(initialValue: T): React.MutableRefObject<T>
    function useRef<T>(initialValue: T | null): React.MutableRefObject<T | null>
    function useRef<T>(): React.MutableRefObject<T | undefined>

    /**
     * React 19 introduced the `use` API for reading Context values (and other
     * usable types) during render. The workspace still depends on
     * `@types/react@18`, so we augment the module with the Context overload.
     */
    function use<T>(usable: React.Context<T>): T
}
