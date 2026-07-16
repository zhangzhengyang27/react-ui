import { useEffect, useRef, useState } from 'react'

/**
 * 剪贴板操作选项配置
 * @property {number} [timeout=2000] - 复制状态重置的时间（毫秒），默认为2000
 */
export interface UseClipboardOptions {
    timeout?: number
}

/**
 * 表示剪贴板操作返回值的接口
 * @property {function} copy - 将值复制到剪贴板的函数
 * @property {function} reset - 重置复制状态和错误的函数
 * @property {Error|null} error - 复制失败时的错误对象
 * @property {boolean} copied - 表示值是否成功复制的布尔值
 */
export interface UseClipboardReturnValue {
    copy: (value: any) => void
    reset: () => void
    error: Error | null
    copied: boolean
}

export function useClipboard(options: UseClipboardOptions = { timeout: 2000 }): UseClipboardReturnValue {
    const [error, setError] = useState<Error | null>(null)
    const [copied, setCopied] = useState(false)
    // 用 ref 存储 timeout id:writeText 是异步的,异步回调闭包若捕获 useState 旧值
    // 会导致 clearTimeout 失效、copied 提前被重置;ref 始终指向最新值
    const copyTimeoutRef = useRef<number | null>(null)

    const handleCopyResult = (value: boolean) => {
        if (copyTimeoutRef.current !== null) {
            window.clearTimeout(copyTimeoutRef.current)
        }
        copyTimeoutRef.current = window.setTimeout(() => {
            copyTimeoutRef.current = null
            setCopied(false)
        }, options.timeout)
        setCopied(value)
    }

    const copy = (value: any) => {
        if ('clipboard' in navigator) {
            navigator.clipboard
                .writeText(value)
                .then(() => handleCopyResult(true))
                .catch(err => setError(err))
        } else {
            setError(new Error('useClipboard: navigator.clipboard is not supported'))
        }
    }

    const reset = () => {
        setCopied(false)
        setError(null)
        if (copyTimeoutRef.current !== null) {
            window.clearTimeout(copyTimeoutRef.current)
            copyTimeoutRef.current = null
        }
    }

    // 卸载时清理 timer,避免对已卸载组件 setState
    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current !== null) {
                window.clearTimeout(copyTimeoutRef.current)
                copyTimeoutRef.current = null
            }
        }
    }, [])

    return { copy, reset, error, copied }
}
