import type { FloatingPosition, FloatingSide } from './types'

export interface FloatingArrowProps extends React.ComponentProps<'div'> {
    position: FloatingPosition
    arrowSize: number
    arrowOffset: number
    arrowRadius: number
    arrowPosition: 'center' | 'side'
    arrowX: number | undefined
    arrowY: number | undefined
    visible: boolean | undefined
}

function getArrowStyles({
    position,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    arrowX,
    arrowY
}: Required<Pick<FloatingArrowProps, 'position' | 'arrowSize' | 'arrowOffset' | 'arrowRadius' | 'arrowPosition'>> &
    Pick<FloatingArrowProps, 'arrowX' | 'arrowY'>): React.CSSProperties {
    const [side, placement = 'center'] = position.split('-') as [FloatingSide, 'start' | 'end' | 'center']
    const size = arrowSize
    const half = size / 2
    const base: React.CSSProperties = {
        width: size,
        height: size,
        position: 'absolute',
        transform: 'rotate(45deg)'
    }

    const radiusBySide: Record<FloatingSide, keyof React.CSSProperties> = {
        bottom: 'borderTopLeftRadius',
        left: 'borderTopRightRadius',
        right: 'borderBottomLeftRadius',
        top: 'borderBottomRightRadius'
    }

    const radiusProperty = radiusBySide[side]
    ;(base as Record<string, React.CSSProperties[keyof React.CSSProperties]>)[radiusProperty] = arrowRadius

    if (side === 'top') {
        base.bottom = -half
        base.left = arrowPosition === 'center' ? arrowX ?? '50%' : placement === 'start' ? arrowOffset : undefined
        base.right = arrowPosition === 'side' && placement === 'end' ? arrowOffset : undefined
    }

    if (side === 'bottom') {
        base.top = -half
        base.left = arrowPosition === 'center' ? arrowX ?? '50%' : placement === 'start' ? arrowOffset : undefined
        base.right = arrowPosition === 'side' && placement === 'end' ? arrowOffset : undefined
    }

    if (side === 'left') {
        base.right = -half
        base.top = arrowPosition === 'center' ? arrowY ?? '50%' : placement === 'start' ? arrowOffset : undefined
        base.bottom = arrowPosition === 'side' && placement === 'end' ? arrowOffset : undefined
    }

    if (side === 'right') {
        base.left = -half
        base.top = arrowPosition === 'center' ? arrowY ?? '50%' : placement === 'start' ? arrowOffset : undefined
        base.bottom = arrowPosition === 'side' && placement === 'end' ? arrowOffset : undefined
    }

    return base
}

export function FloatingArrow({
    position,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    visible,
    arrowX,
    arrowY,
    style,
    ...others
}: FloatingArrowProps) {
    if (!visible) {
        return null
    }

    return (
        <div
            role="presentation"
            {...others}
            style={{
                ...style,
                ...getArrowStyles({
                    position,
                    arrowSize,
                    arrowOffset,
                    arrowRadius,
                    arrowPosition,
                    arrowX,
                    arrowY
                })
            }}
        />
    )
}

FloatingArrow.displayName = '@react-ui/ui/FloatingArrow'
