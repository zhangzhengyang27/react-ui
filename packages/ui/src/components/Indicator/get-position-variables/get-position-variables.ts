import { rem } from '../../../core'
import type { IndicatorPositionVariables } from '../Indicator'
import type { IndicatorPosition } from '../Indicator.types'

export function getPositionVariables(
    _position: IndicatorPosition = 'top-end',
    offset: number | { x: number; y: number } = 0
) {
    const variables: Record<IndicatorPositionVariables, string | undefined> = {
        '--indicator-top': undefined,
        '--indicator-bottom': undefined,
        '--indicator-inline-start': undefined,
        '--indicator-inline-end': undefined,
        '--indicator-translate-x': undefined,
        '--indicator-translate-y': undefined
    }

    const offsetX = typeof offset === 'number' ? offset : offset.x
    const offsetY = typeof offset === 'number' ? offset : offset.y

    const _offsetX = rem(offsetX)
    const _offsetY = rem(offsetY)
    const [position, placement] = _position.split('-')

    if (position === 'top') {
        variables['--indicator-top'] = _offsetY
        variables['--indicator-translate-y'] = '-50%'
    }

    if (position === 'middle') {
        variables['--indicator-top'] = '50%'
        variables['--indicator-translate-y'] = '-50%'
    }

    if (position === 'bottom') {
        variables['--indicator-bottom'] = _offsetY
        variables['--indicator-translate-y'] = '50%'
    }

    // start/end 用逻辑属性（inset-inline-start/end）：RTL 下 'top-end' 渲染在视觉左侧，
    // 与逻辑方位语义一致；translate(-50%/50%) 相对元素自身尺寸居中，与书写方向无关
    if (placement === 'start') {
        variables['--indicator-inline-start'] = _offsetX
        variables['--indicator-translate-x'] = '-50%'
    }

    if (placement === 'center') {
        variables['--indicator-inline-start'] = '50%'
        variables['--indicator-translate-x'] = '-50%'
    }

    if (placement === 'end') {
        variables['--indicator-inline-end'] = _offsetX
        variables['--indicator-translate-x'] = '50%'
    }

    return variables
}
