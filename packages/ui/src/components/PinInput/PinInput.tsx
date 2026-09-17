import { useId } from '@xiaoye-react/hooks'
import { useRef, useState } from 'react'
import {
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    getSize,
    getSpacing,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './PinInput.module.css'

export type PinInputStylesNames = 'root' | 'input'

export type PinInputType = 'number' | 'alphanumeric'

export interface PinInputProps
    extends BoxProps,
        StylesApiProps<PinInputFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    /** Number of input boxes */
    length?: number

    /** 受控值 */
    value?: string

    /** 非受控组件的初始值 */
    defaultValue?: string

    /** 值变化时调用 */
    onChange?: (value: string) => void

    /** Called when all inputs are filled */
    onComplete?: (value: string) => void

    /** Input type */
    type?: PinInputType

    /** If set, inputs are masked */
    mask?: boolean

    /** Placeholder character */
    placeholder?: string

    /** Controls size of inputs @default 'sm' */
    size?: UISize

    /** Gap between inputs */
    gap?: React.CSSProperties['gap']

    /** Name attribute passed to hidden input */
    name?: string

    /** Form attribute passed to hidden input */
    form?: string

    /** If set, inputs are disabled */
    disabled?: boolean

    /** If set, inputs are read-only */
    readOnly?: boolean

    /** If set, autocomplete is enabled on inputs */
    autoComplete?: string
}

export type PinInputFactory = Factory<{
    props: PinInputProps
    ref: HTMLDivElement
    stylesNames: PinInputStylesNames
}>

const defaultProps = {
    length: 4,
    type: 'alphanumeric',
    size: 'sm',
    gap: 'sm'
} satisfies Partial<PinInputProps>

const varsResolver = createVarsResolver<PinInputFactory>((theme, { size, gap }) => ({
    root: {
        '--pin-input-size': getSize(size, 'pin-input-size'),
        '--pin-input-fz': getFontSize(size),
        '--pin-input-gap': gap !== undefined ? getSpacing(gap) : undefined
    }
}))

const EMPTY_VALUE = ''

// 按位数将字符串值展开为定长字符数组：不足位补空串、超长截断，
// 每格一字符的定长结构是内部唯一事实源，天然支持「中间位删除后保留空洞」
const toChars = (value: string | undefined, length: number): string[] =>
    Array.from({ length }, (_, index) => value?.[index] ?? EMPTY_VALUE)

function getNextValue(value: string, type: PinInputType) {
    const char = value.slice(-1)
    if (!char) return EMPTY_VALUE

    if (type === 'number') {
        return /^\d$/.test(char) ? char : EMPTY_VALUE
    }

    return char
}

export const PinInput = factory<PinInputFactory>((_props, ref) => {
    const props = useProps('PinInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        length,
        value,
        defaultValue,
        onChange,
        onComplete,
        type,
        mask,
        placeholder,
        size,
        gap,
        name,
        form,
        disabled,
        readOnly,
        autoComplete,
        ...others
    } = props

    // 内部以定长 string[] 为唯一事实源（空位保留为空串）：
    // 若用 join('') 后的字符串存储，删除中间位时空串不占位，后续字符会整体左移、
    // onChange 值丢位；公开的 value/onChange 仍为拼接后的 string
    const [chars, setChars] = useState<string[]>(() => toChars(defaultValue, length!))
    const charsRef = useRef(chars)
    charsRef.current = chars

    // 受控同步：仅当外部 value 与当前数组表示的字符串不一致时才按位重新展开，
    // 内部变更后父组件回传相同字符串（join 后空洞自然消失）不会重置内部的空洞布局
    if (value !== undefined && value !== charsRef.current.join('')) {
        const nextChars = toChars(value, length!)
        charsRef.current = nextChars
        // 渲染期 setState：React 会丢弃本次渲染输出并立即用新状态重渲染（官方「渲染期间调整 state」模式）
        setChars(nextChars)
    }

    const inputRefs = useRef<HTMLInputElement[]>([])
    const resolvedId = useId()
    const getStyles = useStyles<PinInputFactory>({
        name: 'PinInput',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        rootSelector: 'root'
    })

    const updateValue = (nextChars: string[]) => {
        const nextValue = nextChars.join('')
        charsRef.current = nextChars
        // 内部数组始终随编辑更新以驱动显示；受控模式下若父组件拒绝变更（value 不回传新字符串），
        // 上方渲染期同步会按外部 value 重新展开，显示自动回退
        setChars(nextChars)
        onChange?.(nextValue)

        if (nextChars.length === length! && nextChars.every(char => char !== EMPTY_VALUE)) {
            onComplete?.(nextValue)
        }
    }

    const setInputValue = (index: number, nextValue: string) => {
        const nextChars = Array.from({ length: length! }, (_, i) => charsRef.current[i] ?? EMPTY_VALUE)
        nextChars[index] = nextValue
        updateValue(nextChars)
    }

    const focusInput = (index: number) => {
        const input = inputRefs.current[index]
        if (input) {
            input.focus()
            input.select()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (disabled || readOnly) return

        const nextValue = getNextValue(event.currentTarget.value, type!)
        setInputValue(index, nextValue)

        if (nextValue && index < length! - 1) {
            focusInput(index + 1)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (disabled || readOnly) return

        if (event.key === 'Backspace') {
            event.preventDefault()
            const currentValue = charsRef.current[index]
            setInputValue(index, EMPTY_VALUE)

            if (!currentValue && index > 0) {
                focusInput(index - 1)
            }
        } else if (event.key === 'ArrowLeft' && index > 0) {
            event.preventDefault()
            focusInput(index - 1)
        } else if (event.key === 'ArrowRight' && index < length! - 1) {
            event.preventDefault()
            focusInput(index + 1)
        } else if (event.key === 'Delete') {
            event.preventDefault()
            setInputValue(index, EMPTY_VALUE)
        }
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (disabled || readOnly) return

        event.preventDefault()
        const pasted = event.clipboardData.getData('text')
        // 粘贴语义：用粘贴文本中的合法字符替换整个值，非法字符直接丢弃（不占位），截断到 length
        const validChars = Array.from(pasted)
            .map(char => getNextValue(char, type!))
            .filter(char => char !== EMPTY_VALUE)
            .slice(0, length!)

        // 整值替换：粘贴的合法字符按位填入，余下位数保持空串
        updateValue(toChars(validChars.join(''), length!))
        // 焦点落在最后一个已填字符上（原实现用 EMPTY_VALUE 空串做 replace 实为空操作，这里直接按合法字符数定位）
        focusInput(Math.min(validChars.length, length! - 1))
    }

    const handleFocus = (index: number) => {
        inputRefs.current[index]?.select()
    }

    const inputs = Array.from({ length: length! }, (_, index) => {
        // 定长数组按位取值：空洞位显示空串，删除中间位后后续字符不再左移
        const inputValue = chars[index] ?? EMPTY_VALUE
        const inputId = `${resolvedId}-${index}`

        return (
            <input
                key={index}
                id={inputId}
                ref={el => {
                    if (el) inputRefs.current[index] = el
                }}
                type={type === 'number' ? 'tel' : 'text'}
                inputMode={type === 'number' ? 'numeric' : 'text'}
                maxLength={1}
                disabled={disabled}
                readOnly={readOnly}
                value={inputValue}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-label={`第 ${index + 1} 位,共 ${length} 位`}
                data-masked={mask || undefined}
                {...getStyles('input')}
                onChange={event => handleChange(event, index)}
                onKeyDown={event => handleKeyDown(event, index)}
                onPaste={handlePaste}
                onFocus={() => handleFocus(index)}
            />
        )
    })

    return (
        <div ref={ref} role="group" {...getStyles('root')} {...others}>
            {inputs}
            {name && (
                <input
                    type="hidden"
                    name={name}
                    form={form}
                    value={value !== undefined ? value : chars.join('')}
                    readOnly
                />
            )}
        </div>
    )
})

PinInput.classes = classes
;(PinInput as any).varsResolver = varsResolver
PinInput.displayName = '@xiaoye-react/ui/PinInput'

export namespace PinInput {
    export type Props = PinInputProps
    export type StylesNames = PinInputStylesNames
    export type Factory = PinInputFactory
}
