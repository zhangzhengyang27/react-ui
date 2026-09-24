import { renderHook } from '@testing-library/react'
import { useOs } from './use-os'

describe('useOs', () => {
    it('returns undetermined initially with getValueInEffect', () => {
        // jsdom 默认 UA 带宿主平台（darwin 上无匹配、linux 上命中 isLinux），
        // 固定成 macos UA 消除宿主差异：首帧应是未检测的 undetermined，effect 后是真值 macos
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            configurable: true
        })

        const values: ReturnType<typeof useOs>[] = []
        const { result } = renderHook(() => {
            const value = useOs()
            values.push(value)
            return value
        })

        expect(values[0]).toBe('undetermined')
        expect(result.current).toBe('macos')
    })

    it('detects macos from user agent', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            configurable: true
        })

        const { result } = renderHook(() => useOs({ getValueInEffect: false }))
        expect(result.current).toBe('macos')
    })
})
