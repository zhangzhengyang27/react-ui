import '@testing-library/jest-dom'

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = ResizeObserverMock as any
}

if (typeof window !== 'undefined' && !Element.prototype.scrollTo) {
    Element.prototype.scrollTo = function scrollTo(this: Element, options?: ScrollToOptions | number, y?: number) {
        if (typeof options === 'object' && options !== null) {
            this.scrollLeft = options.left ?? this.scrollLeft
            this.scrollTop = options.top ?? this.scrollTop
        } else if (typeof options === 'number') {
            this.scrollLeft = options
            this.scrollTop = y ?? 0
        }
    } as any
}

// —— 合并扩展包测试后补充的共享环境（与 packages/@xiaoye-react/tests/src/setup.ts 保持同构）——
import { vi } from 'vitest'
// dates 组件的本地化测试依赖 ru locale（DatesProvider 激活前必须先注册）
import 'dayjs/locale/ru'

// 这批测试按 jest 全局编写（历史上从未接入 runner）：把 jest 别名到 vi
;(globalThis as any).jest = vi

// jsdom 未实现 IntersectionObserver：embla-carousel（Carousel）初始化时必需
class IntersectionObserverMock {
    root = null
    rootMargin = ''
    thresholds = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
        return []
    }
}

if (typeof window !== 'undefined' && !window.IntersectionObserver) {
    window.IntersectionObserver = IntersectionObserverMock as any
}
if (typeof globalThis !== 'undefined' && !(globalThis as any).IntersectionObserver) {
    ;(globalThis as any).IntersectionObserver = IntersectionObserverMock
}

// jsdom 未实现 matchMedia：UIProvider 的 auto 色值、use-media-query 消费方会用到
if (typeof window !== 'undefined' && !window.matchMedia) {
    window.matchMedia = ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false
    })) as any
}
