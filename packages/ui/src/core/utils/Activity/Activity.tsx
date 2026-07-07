import React from 'react'

export interface ActivityProps {
    mode: 'visible' | 'hidden'
    children: React.ReactNode
}

/**
 * Activity 组件 fallback。
 * React 19 stable 未导出 Activity（实验性 API），用 display:none 实现 keepMounted 语义：
 * 保留 DOM 与组件 state，仅视觉隐藏。对齐 mantine 对 Activity 的使用。
 * 待 React 正式导出 Activity 后可替换为原生实现。
 */
export function Activity({ mode, children }: ActivityProps) {
    if (mode === 'hidden') {
        return <div style={{ display: 'none' }}>{children}</div>
    }
    return <>{children}</>
}
