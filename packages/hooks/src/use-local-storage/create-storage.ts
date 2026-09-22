import { useCallback, useEffect, useRef, useState } from 'react'
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
        throw new Error(`@xiaoye-react/hooks ${hookName}: Failed to serialize the value`)
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

export type UseStorageReturnValue<T> = [T, (val: T | ((prevState: T) => T)) => void, () => void]

export function createStorage<T>(type: StorageType, hookName: string) {
    const eventName = type === 'localStorage' ? 'react-ui-local-storage' : 'react-ui-session-storage'
    const { getItem, setItem, removeItem } = createStorageHandler(type)

    return function useStorage({
        key,
        defaultValue,
        getInitialValueInEffect = true,
        sync = true,
        deserialize = deserializeJSON,
        serialize = (value: T) => serializeJSON(value, hookName)
    }: UseStorageOptions<T>): UseStorageReturnValue<T> {
        // serialize/deserialize 经 ref 转发最新值：若固化进 useCallback 依赖，
        // 消费方传内联函数（或依赖外部变量的自定义序列化）会被首帧闭包永久捕获
        const serializeRef = useRef(serialize)
        serializeRef.current = serialize
        const deserializeRef = useRef(deserialize)
        deserializeRef.current = deserialize

        const readStorageValue = useCallback(
            (skipStorage?: boolean): T => {
                let storageBlockedOrSkipped

                try {
                    storageBlockedOrSkipped =
                        typeof window === 'undefined' || !(type in window) || window[type] === null || !!skipStorage
                } catch {
                    storageBlockedOrSkipped = true
                }

                if (storageBlockedOrSkipped) {
                    return defaultValue as T
                }

                const storageValue = getItem(key)
                return storageValue !== null ? deserializeRef.current(storageValue) : (defaultValue as T)
            },
            [key, defaultValue]
        )

        const [value, setValue] = useState<T>(readStorageValue(getInitialValueInEffect))

        // 持有最新 value 的 ref，供函数式更新同步读取 prev（避免依赖 updater 的执行时机）
        const valueRef = useRef(value)
        valueRef.current = value

        const setStorageValue = useCallback(
            (val: T | ((prevState: T) => T)) => {
                if (val instanceof Function) {
                    // 函数式更新：同步基于 valueRef 计算新值，updater 保持纯函数；
                    // 副作用（写 storage + dispatchEvent）在 updater 之外仅执行一次，
                    // 避免 StrictMode 双调用 updater 导致重复写 storage / 重复派发事件。
                    const computed = (val as (prevState: T) => T)(valueRef.current)
                    // 立即回写 ref：同一事件批次内连续多次函数式更新能正确叠加，
                    // 否则后续调用仍读到旧值，中间更新被覆盖丢失
                    valueRef.current = computed
                    setValue(computed)
                    try {
                        setItem(key, serializeRef.current(computed))
                        queueMicrotask(() => {
                            window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: computed } }))
                        })
                    } catch {
                        // Storage may be blocked or unavailable
                    }
                } else {
                    setValue(val)
                    try {
                        setItem(key, serializeRef.current(val))
                        window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val } }))
                    } catch {
                        // Storage may be blocked or unavailable
                    }
                }
            },
            [key]
        )

        const removeStorageValue = useCallback(() => {
            valueRef.current = defaultValue as T
            setValue(defaultValue as T)
            try {
                removeItem(key)
                window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: defaultValue } }))
            } catch {
                // Storage may be blocked or unavailable
            }
        }, [key, defaultValue])

        useWindowEvent('storage', (event: StorageEvent) => {
            if (sync) {
                if (event.storageArea === window[type] && event.key === key) {
                    setValue(deserializeRef.current(event.newValue ?? undefined))
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

        // key 必须在依赖里：动态 key（例如按用户 id 切换）变化时若不重读，value 会一直
        // 停留在旧 key 的存储值上。deserialize 走 ref，与读初值/storage 监听处保持一致
        useEffect(() => {
            if (getInitialValueInEffect) {
                const storedValue = getItem(key)
                if (storedValue !== null) {
                    const deserialized = deserializeRef.current(storedValue)
                    if (deserialized !== undefined) {
                        setValue(deserialized)
                    }
                }
            }
        }, [getInitialValueInEffect, key])

        return [value, setStorageValue, removeStorageValue]
    }
}

export function readValue(type: StorageType) {
    const { getItem } = createStorageHandler(type)

    return function read<T>({ key, defaultValue, deserialize = deserializeJSON }: UseStorageOptions<T>) {
        let storageBlockedOrSkipped

        try {
            storageBlockedOrSkipped = typeof window === 'undefined' || !(type in window) || window[type] === null
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
