import { Box } from '../../../core'

export interface ThumbProps extends React.ComponentProps<'div'> {
    position: { x: number; y: number }
}

export function Thumb({ position, ...others }: ThumbProps) {
    return (
        <Box
            __vars={{
                '--thumb-y-offset': `${position.y * 100}%`,
                '--thumb-x-offset': `${position.x * 100}%`
            }}
            {...(others as any)}
        />
    )
}

Thumb.displayName = '@xiaoye-react/ui/ColorPickerThumb'
