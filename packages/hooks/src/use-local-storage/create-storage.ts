import { useCallback, useEffect, useState } from 'react'
import { useWindowEvent } from '../use-window-event/use-window-event'

export type StorageType = 'localStorage' | 'sessionStorage'

export interface UseStorageOptions<T> {
    key: string
    defaultValue?: T
    getInitialValueInEffect?: boolean
    sync?: boolean
    serialize?: (value: T) => string
    deserialize?: (value: string | undefined) => T
}

function serializeJSON<T>(value: T, hookName: string = 'use-local-storage') {
    try {
        return JSON.stringify(value)
    } catch (error) {
        throw new Error(`@react-ui/hooks ${hookName}: Failed to serialize the value`)
    }
}

function deserializeJSON(value: string | undefined) {
    try {
        return value && JSON.parse(value)
    } catch {
        return value
    }
}

function createStorageHandler(type: StorageType) {
    const getItem = (key: string) => {
        try {
            return window[type].getItem(key)
        } catch {
            return null
        }
    }

    const setItem = (key: string, value: string) => {
        try {
            window[type].setItem(key, value)
        } catch {
            // Storage may be blocked or unavailable
        }
    }

    const removeItem = (key: string) => {
        try {
            window[type].removeItem(key)
        } catch {
            // Storage may be blocked or unavailable
        }
    }

    return { getItem, setItem, removeItem }
}

export type UseStorageReturnValue<T> = [
    T,
    (val: T | ((prevState: T) => T)) => void,
    () => void
]

export function createStorage<T>(type: StorageType, hookName: string) {
    const eventName =
        type === 'localStorage' ? 'react-ui-local-storage' : 'react-ui-session-storage'
    const { getItem, setItem, removeItem } = createStorageHandler(type)

    return function useStorage({
        key,
        defaultValue,
        getInitialValueInEffect = true,
        sync = true,
        deserialize = deserializeJSON,
        serialize = (value: T) => serializeJSON(value, hookName)
    }: UseStorageOptions<T>): UseStorageReturnValue<T> {
        const readStorageValue = useCallback(
            (skipStorage?: boolean): T => {
                let storageBlockedOrSkipped

                try {
                    storageBlockedOrSkipped =
                        typeof window === 'undefined' ||
                        !(type in window) ||
                        window[type] === null ||
                        !!skipStorage
                } catch {
                    storageBlockedOrSkipped = true
                }

                if (storageBlockedOrSkipped) {
                    return defaultValue as T
                }

                const storageValue = getItem(key)
                return storageValue !== null ? deserialize(storageValue) : (defaultValue as T)
            },
            [key, defaultValue]
        )

        const [value, setValue] = useState<T>(readStorageValue(getInitialValueInEffect))

        const setStorageValue = useCallback(
            (val: T | ((prevState: T) => T)) => {
                if (val instanceof Function) {
                    setValue(current => {
                        const result = val(current)
                        try {
                            setItem(key, serialize(result))
                            queueMicrotask(() => {
                                window.dispatchEvent(
                                    new CustomEvent(eventName, { detail: { key, value: result } })
                                )
                            })
                        } catch {
                            // Storage may be blocked or unavailable
                        }
                        return result
                    })
                } else {
                    setValue(val)
                    try {
                        setItem(key, serialize(val))
                        window.dispatchEvent(
                            new CustomEvent(eventName, { detail: { key, value: val } })
                        )
                    } catch {
                        // Storage may be blocked or unavailable
                    }
                }
            },
            [key]
        )

        const removeStorageValue = useCallback(() => {
            setValue(defaultValue as T)
            try {
                removeItem(key)
                window.dispatchEvent(
                    new CustomEvent(eventName, { detail: { key, value: defaultValue } })
                )
            } catch {
                // Storage may be blocked or unavailable
            }
        }, [key, defaultValue])

        useWindowEvent('storage', (event: StorageEvent) => {
            if (sync) {
                if (event.storageArea === window[type] && event.key === key) {
                    setValue(deserialize(event.newValue ?? undefined))
                }
            }
        })

        useWindowEvent(eventName, (event: CustomEvent) => {
            if (sync) {
                if (event.detail.key === key) {
                    setValue(event.detail.value)
                }
            }
        })

        useEffect(() => {
            if (defaultValue !== undefined && value === undefined) {
                setValue(defaultValue)
            }
        }, [defaultValue, value])

        useEffect(() => {
            if (getInitialValueInEffect) {
                const storedValue = getItem(key)
                if (storedValue !== null) {
                    const deserialized = deserialize(storedValue)
                    if (deserialized !== undefined) {
                        setValue(deserialized)
                    }
                }
            }
        }, [])

        return [value, setStorageValue, removeStorageValue]
    }
}

export function readValue(type: StorageType) {
    const { getItem } = createStorageHandler(type)

    return function read<T>({
        key,
        defaultValue,
        deserialize = deserializeJSON
    }: UseStorageOptions<T>) {
        let storageBlockedOrSkipped

        try {
            storageBlockedOrSkipped =
                typeof window === 'undefined' || !(type in window) || window[type] === null
        } catch {
            storageBlockedOrSkipped = true
        }

        if (storageBlockedOrSkipped) {
            return defaultValue as T
        }

        const storageValue = getItem(key)
        return storageValue !== null ? deserialize(storageValue) : (defaultValue as T)
    }
}
