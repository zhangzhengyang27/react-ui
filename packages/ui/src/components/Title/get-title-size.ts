import { rem } from '../../core'
import type { TitleOrder, TitleSize } from './Title'

const headings: unknown[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const sizes: unknown[] = ['xs', 'sm', 'md', 'lg', 'xl']

export interface GetTitleSizeResult {
    fontSize: string
    fontWeight: string
    lineHeight: string
}

export function getTitleSize(order: TitleOrder, size?: TitleSize): GetTitleSizeResult {
    const titleSize = size !== undefined ? size : `h${order}`

    if (headings.includes(titleSize)) {
        return {
            fontSize: `var(--ui-${titleSize}-font-size)`,
            fontWeight: `var(--ui-${titleSize}-font-weight)`,
            lineHeight: `var(--ui-${titleSize}-line-height)`
        }
    } else if (sizes.includes(titleSize)) {
        return {
            fontSize: `var(--ui-font-size-${titleSize})`,
            fontWeight: `var(--ui-h${order}-font-weight)`,
            lineHeight: `var(--ui-h${order}-line-height)`
        }
    }

    return {
        fontSize: rem(titleSize),
        fontWeight: `var(--ui-h${order}-font-weight)`,
        lineHeight: `var(--ui-h${order}-line-height)`
    }
}
