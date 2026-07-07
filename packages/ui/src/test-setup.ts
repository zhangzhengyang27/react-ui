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
