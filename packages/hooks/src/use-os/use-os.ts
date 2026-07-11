import { useState } from 'react'
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect'

export type UseOSReturnValue =
    | 'undetermined'
    | 'macos'
    | 'ios'
    | 'windows'
    | 'android'
    | 'linux'
    | 'chromeos'

function isMacOS(userAgent: string): boolean {
    return /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i.test(userAgent)
}

function isIOS(userAgent: string): boolean {
    return /(iPhone)|(iPad)|(iPod)/i.test(userAgent)
}

function isWindows(userAgent: string): boolean {
    return /(Win32)|(Win64)|(Windows)|(WinCE)/i.test(userAgent)
}

function isAndroid(userAgent: string): boolean {
    return /Android/i.test(userAgent)
}

function isLinux(userAgent: string): boolean {
    return /Linux/i.test(userAgent)
}

function isChromeOS(userAgent: string): boolean {
    return /CrOS/i.test(userAgent)
}

function getOS(): UseOSReturnValue {
    if (typeof window === 'undefined') {
        return 'undetermined'
    }

    const { userAgent } = window.navigator

    if (isIOS(userAgent) || (isMacOS(userAgent) && navigator.maxTouchPoints > 1)) {
        return 'ios'
    }
    if (isMacOS(userAgent)) {
        return 'macos'
    }
    if (isWindows(userAgent)) {
        return 'windows'
    }
    if (isAndroid(userAgent)) {
        return 'android'
    }
    if (isChromeOS(userAgent)) {
        return 'chromeos'
    }
    if (isLinux(userAgent)) {
        return 'linux'
    }

    return 'undetermined'
}

export interface UseOsOptions {
    /** 是否在 effect 中获取实际值，默认 true；设为 false 则在 SSR 阶段直接读取 navigator */
    getValueInEffect?: boolean
}

/**
 * 检测当前操作系统。
 * @param options 配置项
 * @returns 操作系统标识
 */
export function useOs(options: UseOsOptions = {}): UseOSReturnValue {
    const { getValueInEffect = true } = options
    const [value, setValue] = useState<UseOSReturnValue>(getValueInEffect ? 'undetermined' : getOS())

    useIsomorphicEffect(() => {
        if (getValueInEffect) {
            setValue(getOS())
        }
    }, [getValueInEffect])

    return value
}

export namespace useOs {
    export type Options = UseOsOptions
    export type ReturnValue = UseOSReturnValue
}
