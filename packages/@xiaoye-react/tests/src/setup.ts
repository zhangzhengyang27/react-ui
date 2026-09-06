import '@testing-library/jest-dom'
import { vi } from 'vitest'

// 这批测试按 jest 全局编写（历史上从未接入 runner）：把 jest 别名到 vi，
// jest.fn/spyOn 与 vi 实现同构，避免大面积改写测试文件
;(globalThis as any).jest = vi

// 扩展包测试的共享环境准备：与 packages/ui 的 test-setup 保持同构，
// 各包 vitest.config.ts 通过 setupFiles 引用本文件

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
            this.scrollLeft = options.left ?? 0
            this.scrollTop = options.top ?? 0
        } else if (typeof options === 'number') {
            this.scrollLeft = options
            this.scrollTop = y ?? 0
        }
    } as any
}

// jsdom 未实现 matchMedia：部分组件（UIProvider 的 auto 色值、use-media-query 消费方）会用到
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
