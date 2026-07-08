import { useUncontrolled } from '@react-ui/hooks'
import {
    Box,
    createVarsResolver,
    factory,
    getFontSize,
    getRadius,
    getSize,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type MantineColor,
    type MantineRadius,
    type MantineSize,
    type StylesApiProps
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import classes from './Pagination.module.css'

export type PaginationItemType = 'page' | 'dots' | 'next' | 'previous' | 'first' | 'last'

export type PaginationStylesNames = 'root' | 'control' | 'dots'

export type PaginationCssVariables = {
    root:
        | '--pagination-control-size'
        | '--pagination-control-fz'
        | '--pagination-control-radius'
        | '--pagination-control-bg'
        | '--pagination-control-color'
}

export interface PaginationProps
    extends BoxProps,
        Omit<ElementProps<'div'>, 'onChange'>,
        StylesApiProps<PaginationFactory> {
    /** Total number of pages */
    total: number

    /** Controlled current page */
    value?: number

    /** Uncontrolled initial page */
    defaultValue?: number

    /** Called when page changes */
    onChange?: (value: number) => void

    /** Key of theme.colors or any valid CSS color */
    color?: MantineColor

    /** Key of theme.radius or any valid CSS value */
    radius?: MantineRadius

    /** Controls size of pagination buttons */
    size?: MantineSize

    /** Determines whether first and last page controls should be rendered */
    withEdges?: boolean

    /** Determines whether previous and next page controls should be rendered */
    withControls?: boolean

    /** Number of siblings displayed on each side of current page */
    siblings?: number

    /** Number of items displayed at the start and end of pagination */
    boundaries?: number
}

export type PaginationFactory = Factory<{
    props: PaginationProps
    ref: HTMLDivElement
    stylesNames: PaginationStylesNames
    vars: PaginationCssVariables
}>

const defaultProps = {
    size: 'sm',
    siblings: 1,
    boundaries: 1,
    withControls: true,
    withEdges: false
} satisfies Partial<PaginationProps>

const varsResolver = createVarsResolver<PaginationFactory>((theme, { size, radius, color }) => {
    const colors = theme.variantColorResolver({
        color: color || theme.primaryColor,
        theme,
        variant: 'filled'
    })

    return {
        root: {
            '--pagination-control-size': getSize(size, 'pagination-control-size'),
            '--pagination-control-fz': getFontSize(size),
            '--pagination-control-radius': radius === undefined ? undefined : getRadius(radius),
            '--pagination-control-bg': colors.background,
            '--pagination-control-color': colors.color
        }
    }
})

function range(start: number, end: number) {
    const length = end - start + 1
    return Array.from({ length }, (_, index) => start + index)
}

type PaginationItem = number | 'dots'

export function getPaginationItems(
    total: number,
    activePage: number,
    siblings: number,
    boundaries: number
): PaginationItem[] {
    const totalValueNumbers = siblings * 2 + 3 + boundaries * 2

    if (total <= totalValueNumbers) {
        return range(1, total)
    }

    const leftSiblingIndex = Math.max(activePage - siblings, boundaries + 2)
    const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries - 1)

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
    const shouldShowRightDots = rightSiblingIndex < total - boundaries - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = siblings * 2 + boundaries + 3
        return [...range(1, leftItemCount), 'dots', ...range(total - boundaries + 1, total)]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = siblings * 2 + boundaries + 3
        return [...range(1, boundaries), 'dots', ...range(total - rightItemCount + 1, total)]
    }

    return [
        ...range(1, boundaries),
        'dots',
        ...range(leftSiblingIndex, rightSiblingIndex),
        'dots',
        ...range(total - boundaries + 1, total)
    ]
}

function getControlLabel(type: PaginationItemType) {
    switch (type) {
        case 'first':
            return '<<'
        case 'previous':
            return '<'
        case 'next':
            return '>'
        case 'last':
            return '>>'
        default:
            return ''
    }
}

export const Pagination = factory<PaginationFactory>((_props, ref) => {
    const props = useProps('Pagination', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        total,
        value,
        defaultValue,
        onChange,
        color,
        radius,
        size,
        withEdges,
        withControls,
        siblings,
        boundaries,
        mod,
        ...others
    } = props

    const [activePage, setActivePage] = useUncontrolled<number>({
        value,
        defaultValue,
        finalValue: 1,
        onChange
    })

    const getStyles = useStyles<PaginationFactory>({
        name: 'Pagination',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    const normalizedTotal = Math.max(0, Math.floor(total))
    const currentPage = Math.min(Math.max(1, activePage), normalizedTotal || 1)

    const handleChange = (page: number) => {
        if (page >= 1 && page <= normalizedTotal && page !== currentPage) {
            setActivePage(page)
        }
    }

    const items = normalizedTotal > 0 ? getPaginationItems(normalizedTotal, currentPage, siblings!, boundaries!) : []

    const controls: { type: PaginationItemType; value: number; disabled: boolean; label: string }[] = []

    if (withEdges) {
        controls.push({ type: 'first', value: 1, disabled: currentPage === 1, label: 'First page' })
    }

    if (withControls) {
        controls.push({
            type: 'previous',
            value: currentPage - 1,
            disabled: currentPage === 1,
            label: 'Previous page'
        })
    }

    items.forEach(item => {
        if (typeof item === 'number') {
            controls.push({
                type: 'page',
                value: item,
                disabled: false,
                label: `Page ${item}`
            })
        } else {
            controls.push({ type: 'dots', value: -1, disabled: true, label: 'Dots' })
        }
    })

    if (withControls) {
        controls.push({
            type: 'next',
            value: currentPage + 1,
            disabled: currentPage === normalizedTotal,
            label: 'Next page'
        })
    }

    if (withEdges) {
        controls.push({
            type: 'last',
            value: normalizedTotal,
            disabled: currentPage === normalizedTotal,
            label: 'Last page'
        })
    }

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others} role="navigation" aria-label="Pagination">
            {controls.map((control, index) => {
                if (control.type === 'dots') {
                    return (
                        <span key={`dots-${index}`} {...getStyles('dots')} aria-hidden>
                            ...
                        </span>
                    )
                }

                const isActive = control.type === 'page' && control.value === currentPage

                return (
                    <UnstyledButton
                        key={`${control.type}-${control.value}`}
                        {...getStyles('control', { active: isActive })}
                        type="button"
                        disabled={control.disabled}
                        aria-label={control.label}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => handleChange(control.value)}
                    >
                        {control.type === 'page' ? control.value : getControlLabel(control.type)}
                    </UnstyledButton>
                )
            })}
        </Box>
    )
})

Pagination.classes = classes
;(Pagination as any).varsResolver = varsResolver
Pagination.displayName = '@react-ui/ui/Pagination'

export namespace Pagination {
    export type Props = PaginationProps
    export type StylesNames = PaginationStylesNames
    export type CssVariables = PaginationCssVariables
    export type Factory = PaginationFactory
}
