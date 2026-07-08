import type { FlipOptions, InlineOptions, ShiftOptions, SizeOptions } from '@floating-ui/react'

export type PopoverWidth = React.CSSProperties['width']

export interface PopoverMiddlewares {
    shift?: boolean | ShiftOptions
    flip?: boolean | FlipOptions
    inline?: boolean | InlineOptions
    size?: boolean | SizeOptions
}
