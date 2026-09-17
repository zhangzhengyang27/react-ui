import { useEffect, useRef, useState } from 'react'
import { clampUseMovePosition, useMove, UseMovePosition } from '@xiaoye-react/hooks'
import { Box, ElementProps, UISize } from '../../../core'
import { useColorPickerContext } from '../ColorPicker.context'
import { HsvaColor } from '../ColorPicker.types'
import { convertHsvaTo } from '../converters'
import { Thumb } from '../Thumb/Thumb'

export interface SaturationProps extends ElementProps<'div', 'onChange'> {
    value: HsvaColor
    onChange: (color: Partial<HsvaColor>) => void
    onChangeEnd: (color: Partial<HsvaColor>) => void
    onScrubStart?: () => void
    onScrubEnd?: () => void
    saturationLabel?: string
    size: UISize | (string & {})
    color: string
    focusable?: boolean
}

export function Saturation({
    className,
    onChange,
    onChangeEnd,
    value,
    saturationLabel,
    focusable = true,
    size,
    color,
    onScrubStart,
    onScrubEnd,
    ...others
}: SaturationProps) {
    const { getStyles } = useColorPickerContext()

    const [position, setPosition] = useState(() => ({ x: value.s / 100, y: 1 - value.v / 100 }))
    const positionRef = useRef(position)

    const { ref } = useMove(
        ({ x, y }) => {
            positionRef.current = { x, y }
            onChange({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) })
        },
        {
            onScrubEnd: () => {
                const { x, y } = positionRef.current
                onChangeEnd({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) })
                onScrubEnd?.()
            },
            onScrubStart
        }
    )

    useEffect(() => {
        setPosition({ x: value.s / 100, y: 1 - value.v / 100 })
    }, [value.s, value.v])

    const handleArrow = (event: React.KeyboardEvent<HTMLDivElement>, pos: UseMovePosition) => {
        event.preventDefault()
        const _position = clampUseMovePosition(pos)
        onChange({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) })
        onChangeEnd({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case 'ArrowUp': {
                handleArrow(event, { y: position.y - 0.05, x: position.x })
                break
            }

            case 'ArrowDown': {
                handleArrow(event, { y: position.y + 0.05, x: position.x })
                break
            }

            case 'ArrowRight': {
                handleArrow(event, { x: position.x + 0.05, y: position.y })
                break
            }

            case 'ArrowLeft': {
                handleArrow(event, { x: position.x - 0.05, y: position.y })
                break
            }
        }
    }

    return (
        <Box
            {...getStyles('saturation')}
            ref={ref as any}
            {...others}
            role="slider"
            aria-label={saturationLabel}
            // 饱和度按 0-100 百分比语义提供 min/max/now（对齐 ColorSlider 的做法），
            // 避免读屏播报 0-1 的裸浮点且缺失取值基准
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position.x * 100)}
            aria-valuetext={convertHsvaTo('rgba', value)}
            tabIndex={focusable ? 0 : -1}
            onKeyDown={handleKeyDown}
            data-size={size}
        >
            <div
                {...getStyles('saturationOverlay', {
                    style: { backgroundColor: `hsl(${value.h}, 100%, 50%)` }
                })}
            />

            <div
                {...getStyles('saturationOverlay', {
                    style: { backgroundImage: 'linear-gradient(90deg, #fff, transparent)' }
                })}
            />

            <div
                {...getStyles('saturationOverlay', {
                    style: { backgroundImage: 'linear-gradient(0deg, #000, transparent)' }
                })}
            />

            <Thumb position={position} {...getStyles('thumb', { style: { backgroundColor: color } })} />
        </Box>
    )
}

Saturation.displayName = '@xiaoye-react/ui/Saturation'
