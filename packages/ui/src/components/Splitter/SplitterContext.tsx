import { createContext, useContext } from 'react'
import type { SplitterPaneSize, UseSplitterReturnValue } from '@xiaoye-react/hooks'

export interface SplitterContextValue {
    orientation: 'horizontal' | 'vertical'
    /** 面板尺寸,单位保持声明时的单位(数字/`%` 为弹性尺寸,`px`/`rem` 为固定尺寸) */
    sizes: SplitterPaneSize[]
    /** 是否以像素为单位跟踪尺寸(任一 size/min/max/step 使用了 px/rem 单位) */
    pixelMode: boolean
    /** 拖拽/键盘逻辑全部由 useSplitter 提供,分隔条只需透传这些 props */
    getHandleProps: UseSplitterReturnValue['getHandleProps']
}

export const SplitterContext = createContext<SplitterContextValue | null>(null)

export function useSplitterContext() {
    const ctx = useContext(SplitterContext)
    if (!ctx) {
        throw new Error('Splitter subcomponents must be used inside <Splitter />')
    }
    return ctx
}
