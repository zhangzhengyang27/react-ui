import React from 'react'
import clsx from 'clsx'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getSize,
    UIColor,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Rating.module.css'

export type RatingStylesNames = 'root' | 'star' | 'starSymbol' | 'input'

export type RatingCssVariables = {
    root: '--rating-size' | '--rating-color'
}

export interface RatingProps extends BoxProps, StylesApiProps<RatingFactory> {
    /** Current rating value */
    value?: number

    /** Default value for uncontrolled rating */
    defaultValue?: number

    /** 值变化时调用 */
    onChange?: (value: number) => void

    /** Called when hover value changes */
    onHover?: (value: number) => void

    /** Number of stars @default 5 */
    count?: number

    /** Controls star size */
    size?: UISize | number | string

    /** Star color, key of theme.colors or any valid CSS color @default yellow */
    color?: UIColor

    /** If true, the rating is read-only: 不可交互,但当前值仍随表单提交 @default false */
    readOnly?: boolean

    /** If true, clicking the current value clears it @default false */
    clearable?: boolean

    /** Number of fractions per star, e.g. 2 for half-stars @default 1 */
    fractions?: number

    /** radio 组名称，缺省用内部生成 id（同一表单内多个 Rating 需显式区分） */
    name?: string
}

export type RatingFactory = Factory<{
    props: RatingProps
    ref: HTMLDivElement
    stylesNames: RatingStylesNames
    vars: RatingCssVariables
}>

const defaultProps = {
    count: 5,
    fractions: 1,
    readOnly: false,
    clearable: false
} satisfies Partial<RatingProps>

const StarSymbol = (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

const varsResolver = createVarsResolver<RatingFactory>((_, { size, color }) => ({
    root: {
        '--rating-size': size === undefined ? undefined : getSize(size, 'rating-size'),
        '--rating-color': color === undefined ? undefined : `var(--ui-color-${color}-filled)`
    }
}))

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

function roundToFraction(value: number, fractions: number) {
    const fraction = 1 / fractions
    return Math.round(value / fraction) * fraction
}

export const Rating = factory<RatingFactory>((_props, ref) => {
    const props = useProps('Rating', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value,
        defaultValue,
        onChange,
        onHover,
        count,
        size,
        color,
        readOnly,
        clearable,
        fractions,
        name,
        mod,
        ...others
    } = props

    const getStyles = useStyles<RatingFactory>({
        name: 'Rating',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? 0)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    // clearable 判断用不含 hover 的真实当前值：hover 预览值不得参与清零判定
    const baseValue = roundToFraction(clamp(isControlled ? value! : internalValue, 0, count), fractions)
    const currentValue = clamp(hoverValue ?? baseValue, 0, count)
    const roundedValue = roundToFraction(currentValue, fractions)
    const groupName = `${React.useId()}-rating`

    const updateValue = (next: number) => {
        if (!isControlled) {
            setInternalValue(next)
        }
        onChange?.(next)
    }

    // 按指针在星内的水平位置计算分数：fractions 等分单星（fractions=2 即半星），
    // fractions=1 时退化为 index+1（ceil(p*1) 恒为 1）
    const getValueFromPointer = (index: number, event: React.MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        if (rect.width === 0) return index + 1
        const percent = clamp((event.clientX - rect.left) / rect.width, 0, 1)
        const fraction = clamp(Math.ceil(percent * fractions!), 1, fractions!)
        return index + fraction / fractions!
    }

    const handleHover = (index: number, event: React.MouseEvent<HTMLElement>) => {
        if (readOnly) return
        const next = getValueFromPointer(index, event)
        if (next !== hoverValue) {
            setHoverValue(next)
            onHover?.(next)
        }
    }

    const handleHoverEnd = () => {
        setHoverValue(null)
        onHover?.(0)
    }

    // 标记「本次点击已按分数提交」：click 先于 change 触发，点击未选中的 radio 会紧跟一次
    // 整星 change，需让 change 跳过避免分数提交被整星覆盖（键盘路径不经过 click，不受影响）
    const pointerCommitRef = React.useRef(false)

    const handleRadioChange = (starValue: number) => {
        if (readOnly) return
        if (pointerCommitRef.current) {
            pointerCommitRef.current = false
            return
        }
        updateValue(starValue)
    }

    // 点击路径用指针在星内的水平位置计算分数值提交（fractions=2 即半星），键盘（方向键引发的
    // change）保持整星步进；clearable 对分数值同样按「点击当前值」判定清零
    const handleRadioClick = (
        starValue: number,
        event: React.MouseEvent<HTMLInputElement>,
        wasChecked: boolean
    ) => {
        pointerCommitRef.current = false
        if (readOnly) return

        // 键盘合成的 click（如空格键）没有真实指针坐标（detail=0），退回整星语义
        const fractionValue = event.detail === 0 ? starValue : getValueFromPointer(starValue - 1, event)

        // 点击此前未选中的 radio 会紧跟触发 change：标记让 change 跳过（已按分数提交）；
        // 点击已选中的 radio 不触发 change，不可标记，否则会吞掉后续键盘整星提交
        if (!wasChecked) {
            pointerCommitRef.current = true
        }

        if (clearable && fractionValue === baseValue) {
            updateValue(0)
            return
        }

        if (fractionValue !== baseValue) {
            updateValue(fractionValue)
        }
    }

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ readonly: readOnly }, mod]}
            role="radiogroup"
            aria-label="评分"
            aria-readonly={readOnly || undefined}
            onMouseLeave={handleHoverEnd}
            {...others}
        >
            {Array.from({ length: count }).map((_, index) => {
                const starValue = index + 1
                const filled = roundedValue >= starValue
                const partial = roundedValue > index && roundedValue < starValue
                const fillPercent = partial ? (roundedValue - index) * 100 : 0
                // 原生 radio 无法表达分数勾选：整星部分由 radio 承载，分数部分保持视觉呈现
                const isChecked = baseValue > 0 && Math.ceil(baseValue) === starValue
                const starSymbolStyles = getStyles('starSymbol')

                return (
                    <Box
                        key={index}
                        component="label"
                        {...getStyles('star')}
                        mod={{ filled: filled || partial }}
                        onMouseEnter={event => handleHover(index, event)}
                        onMouseMove={event => handleHover(index, event)}
                    >
                        <input
                            {...getStyles('input')}
                            type="radio"
                            name={name || groupName}
                            value={starValue}
                            checked={isChecked}
                            // 真 readonly 语义：radio 保持启用（值随表单提交），指针交互由
                            // [data-readonly] 的 pointer-events 拦截，键盘变更在此拦截
                            onKeyDown={event => {
                                if (readOnly && event.key !== 'Tab') {
                                    event.preventDefault()
                                }
                            }}
                            // 组内播报语言与其余组件一致（中文），避免「评分」+「N star」混用
                            aria-label={`${starValue} 星`}
                            onChange={() => handleRadioChange(starValue)}
                            onClick={event => handleRadioClick(starValue, event, isChecked)}
                            // roving tabindex：勾选中的星可 Tab；无勾选时首星可 Tab
                            tabIndex={isChecked || (baseValue === 0 && index === 0) ? 0 : -1}
                        />
                        {/* 底层空星：颜色由 .starSymbol 的 CSS 提供，内联 color 与其重复且会覆盖消费者 styles */}
                        <span {...starSymbolStyles}>
                            {StarSymbol}
                        </span>
                        {/* 填充层：className/style 与 getStyles('starSymbol') 的产物合并，
                            使消费者的 classNames/styles.starSymbol 在两层同时生效 */}
                        <span
                            {...starSymbolStyles}
                            className={clsx(starSymbolStyles.className, classes.starFilled)}
                            style={{
                                ...starSymbolStyles.style,
                                clipPath: partial ? `inset(0 ${100 - fillPercent}% 0 0)` : undefined,
                                opacity: filled || partial ? 1 : 0
                            }}
                        >
                            {StarSymbol}
                        </span>
                    </Box>
                )
            })}
        </Box>
    )
})

Rating.classes = classes
;(Rating as any).varsResolver = varsResolver
Rating.displayName = '@xiaoye-react/ui/Rating'

export namespace Rating {
    export type Props = RatingProps
    export type Factory = RatingFactory
    export type StylesNames = RatingStylesNames
    export type CssVariables = RatingCssVariables
}
