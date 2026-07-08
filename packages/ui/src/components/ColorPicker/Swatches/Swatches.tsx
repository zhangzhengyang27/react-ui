import { Box, ElementProps } from '../../../core'
import { ColorSwatch } from '../../ColorSwatch'
import { useColorPickerContext } from '../ColorPicker.context'
import { hsvaToRgbaObject } from '../converters/converters'
import { parseColor } from '../converters/parsers'

function CheckIcon({ size, color }: { size: string | number; color: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: size, height: size }}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function getLuminance(color: string) {
    const { r, g, b } = hsvaToRgbaObject(parseColor(color))
    const sR = r / 255
    const sG = g / 255
    const sB = b / 255
    const gammaCorrect = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * gammaCorrect(sR) + 0.7152 * gammaCorrect(sG) + 0.0722 * gammaCorrect(sB)
}

export interface SwatchesProps extends ElementProps<'div'> {
    size?: string | number
    data: string[]
    swatchesPerRow?: number
    focusable?: boolean
    value?: string
    onChangeEnd?: (color: string) => void
    setValue: (value: string) => void
}

export function Swatches({
    className,
    setValue,
    onChangeEnd,
    size,
    focusable,
    data,
    swatchesPerRow,
    value,
    ...others
}: SwatchesProps) {
    const ctx = useColorPickerContext()

    const colors = data.map((color, index) => (
        <ColorSwatch
            {...ctx.getStyles('swatch')}
            unstyled={ctx.unstyled}
            component="button"
            type="button"
            color={color}
            key={index}
            radius="sm"
            onClick={() => {
                setValue(color)
                onChangeEnd?.(color)
            }}
            aria-label={color}
            tabIndex={focusable ? 0 : -1}
            data-swatch
        >
            {value === color && <CheckIcon size="35%" color={getLuminance(color) < 0.5 ? 'white' : 'black'} />}
        </ColorSwatch>
    ))

    return (
        <Box {...ctx.getStyles('swatches')} {...others}>
            {colors}
        </Box>
    )
}

Swatches.displayName = '@react-ui/ui/Swatches'
