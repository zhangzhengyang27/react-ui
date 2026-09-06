import type { FloatingPosition } from './types'

/**
 * 根据文本方向解析实际的浮层位置：rtl 下 left/right 互换，
 * 保证同一 position 配置在两种方向下都出现在目标的正确一侧。
 */
export function getFloatingPosition(dir: 'rtl' | 'ltr', position: FloatingPosition): FloatingPosition {
    if (dir === 'ltr') {
        return position
    }

    return position.replace(/left|right/g, matched => (matched === 'left' ? 'right' : 'left')) as FloatingPosition
}
