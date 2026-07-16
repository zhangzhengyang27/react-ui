import { useCallback, useEffect, useRef } from 'react'
import { assignRef, useId, useMergedRef, useUncontrolled } from '@react-ui/hooks'
import {
    factory,
    useProps,
    useStyles,
    type Factory,
    type StylesApiProps
} from '../../core'
import { InputBase, type InputBaseProps } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './MaskInput.module.css'

export type MaskInputStylesNames = 'root'

/** A single mask slot — either a RegExp pattern (token) or a string literal */
type MaskSlot = { type: 'token'; pattern: RegExp } | { type: 'literal'; char: string }

const DEFAULT_TOKENS: Record<string, RegExp> = {
    '0': /[0-9]/,
    '9': /[0-9]/,
    a: /[a-z]/,
    A: /[A-Z]/,
    L: /[A-Za-z]/,
    '*': /[a-zA-Z0-9]/,
    '#': /[a-zA-Z0-9]/
}

export interface MaskInputProps
    extends Omit<
            InputBaseProps,
            | 'value'
            | 'defaultValue'
            | 'onChange'
            | 'classNames'
            | 'styles'
            | 'unstyled'
            | 'vars'
            | 'attributes'
            | 'component'
            | 'labelProps'
            | 'descriptionProps'
            | 'errorProps'
        >,
        StylesApiProps<MaskInputFactory> {
    /** Mask pattern string or array of string literals and RegExp objects */
    mask: string | Array<string | RegExp>

    /** Override or extend the default token map */
    tokens?: Record<string, RegExp>

    /** Called before masking on each keystroke, can return overrides for mask options */
    modify?: (
        value: string
    ) => Partial<Pick<MaskInputProps, 'mask' | 'tokens' | 'slotChar' | 'separate'>> | undefined

    /** When true, raw and display values are decoupled */
    separate?: boolean

    /** Character displayed in unfilled slots, `"_"` by default */
    slotChar?: string | null

    /** Show mask pattern even when field is empty and unfocused */
    alwaysShowMask?: boolean

    /** Show mask placeholder on focus, `true` by default */
    showMaskOnFocus?: boolean

    /** Transform each character before validation and insertion */
    transform?: (char: string) => string

    /** Clear value on blur when mask is incomplete, `false` by default */
    autoClear?: boolean

    /** Called on every change with raw and masked values */
    onChangeRaw?: (rawValue: string, maskedValue: string) => void

    /** Called when all required mask slots are filled */
    onComplete?: (maskedValue: string, rawValue: string) => void

    /** Assigns a function that clears the input value to the given ref */
    resetRef?: React.RefObject<(() => void) | null>

    //** 受控值 */
    value?: string

    /** Uncontrolled default value */
    defaultValue?: string

    //** 值变化时调用 */
    onChange?: (value: string) => void

    //** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    //** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    /** Success message rendered below the input */
    success?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** Props passed to the label element */
    labelProps?: React.ComponentProps<'label'>

    /** Props passed to the description element */
    descriptionProps?: React.ComponentProps<'div'>

    /** Props passed to the error element */
    errorProps?: React.ComponentProps<'div'>
}

export type MaskInputFactory = Factory<{
    props: MaskInputProps
    ref: HTMLInputElement
    stylesNames: MaskInputStylesNames
}>

const defaultProps = {
    slotChar: '_',
    showMaskOnFocus: true,
    separate: false,
    alwaysShowMask: false,
    autoClear: false
} satisfies Partial<MaskInputProps>

/** Parse mask into slots */
function parseMask(
    mask: string | Array<string | RegExp>,
    tokens: Record<string, RegExp>
): MaskSlot[] {
    const slots: MaskSlot[] = []

    if (Array.isArray(mask)) {
        for (const item of mask) {
            if (item instanceof RegExp) {
                slots.push({ type: 'token', pattern: item })
            } else {
                for (const char of item) {
                    slots.push({ type: 'literal', char })
                }
            }
        }
    } else {
        for (let i = 0; i < mask.length; i++) {
            const char = mask[i]

            if (char === '\\' && i + 1 < mask.length) {
                i++
                slots.push({ type: 'literal', char: mask[i] })
                continue
            }

            if (tokens[char]) {
                slots.push({ type: 'token', pattern: tokens[char] })
            } else {
                slots.push({ type: 'literal', char })
            }
        }
    }

    return slots
}

/** Apply mask to raw input value, returns masked value (without placeholder fill) */
function applyMaskToValue(
    input: string,
    slots: MaskSlot[],
    transform?: (char: string) => string
): string {
    let result = ''
    let inputIndex = 0

    for (const slot of slots) {
        if (inputIndex >= input.length) break

        if (slot.type === 'literal') {
            result += slot.char
            if (inputIndex < input.length && input[inputIndex] === slot.char) {
                inputIndex++
            }
            continue
        }

        while (inputIndex < input.length) {
            const ch = input[inputIndex]
            inputIndex++
            const transformed = transform ? transform(ch) : ch
            if (slot.pattern.test(transformed)) {
                result += transformed
                break
            }
        }
    }

    return result
}

/** Build display value with placeholder fill */
function buildDisplayValue(masked: string, slots: MaskSlot[], slotChar: string): string {
    let display = masked

    for (let i = masked.length; i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'literal') {
            display += slot.char
        } else {
            display += slotChar
        }
    }

    return display
}

/** Extract raw value from masked value */
function extractRaw(masked: string, slots: MaskSlot[]): string {
    let raw = ''
    for (let i = 0; i < masked.length && i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'token') {
            if (slot.pattern.test(masked[i])) {
                raw += masked[i]
            }
        }
    }
    return raw
}

/** Check if all token slots are filled */
function isMaskComplete(masked: string, slots: MaskSlot[]): boolean {
    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'token') {
            if (i >= masked.length || !slot.pattern.test(masked[i])) {
                return false
            }
        }
    }
    return true
}

export const MaskInput = factory<MaskInputFactory>((_props, ref) => {
    const props = useProps('MaskInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        mask,
        tokens,
        modify,
        separate,
        slotChar,
        alwaysShowMask,
        showMaskOnFocus,
        transform,
        autoClear,
        onChangeRaw,
        onComplete,
        resetRef,
        value: valueProp,
        defaultValue,
        onChange,
        label,
        description,
        error,
        success,
        required,
        labelProps,
        descriptionProps,
        errorProps,
        wrapperProps,
        id,
        ...others
    } = props

    const getStyles = useStyles<MaskInputFactory>({
        name: 'MaskInput',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'root'
    })

    const [value, setValue] = useUncontrolled<string>({
        value: valueProp,
        defaultValue,
        finalValue: '',
        onChange
    })

    const inputId = useId(id)
    const hasWrapper = label || description || error || success
    const inputRef = useRef<HTMLInputElement | null>(null)
    const mergedRef = useMergedRef(ref, inputRef)

    // Resolve current mask options (with modify support)
    const resolveOptions = useCallback(
        (currentValue: string) => {
            const modified = modify?.(currentValue) || {}
            const effectiveMask = modified.mask ?? mask
            const effectiveTokens = { ...DEFAULT_TOKENS, ...(modified.tokens ?? tokens) }
            const effectiveSlotChar = modified.slotChar ?? slotChar ?? '_'
            const effectiveSeparate = modified.separate ?? separate ?? false
            return {
                mask: effectiveMask,
                tokens: effectiveTokens,
                slotChar: effectiveSlotChar,
                separate: effectiveSeparate
            }
        },
        [mask, tokens, slotChar, separate, modify]
    )

    // Compute masked and display values
    const options = resolveOptions(value)
    const slots = parseMask(options.mask, options.tokens)
    const maskedValue = applyMaskToValue(value, slots, transform)
    const displayValue = options.separate
        ? value
        : buildDisplayValue(maskedValue, slots, options.slotChar)

    // Assign reset function to resetRef
    useEffect(() => {
        if (resetRef) {
            assignRef(resetRef, () => {
                setValue('')
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
            })
        }
        return () => {
            if (resetRef) {
                assignRef(resetRef, null)
            }
        }
    }, [resetRef, setValue])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value
        const currentOptions = resolveOptions(value)
        const currentSlots = parseMask(currentOptions.mask, currentOptions.tokens)
        const newMasked = applyMaskToValue(inputValue, currentSlots, transform)
        const newDisplay = currentOptions.separate
            ? inputValue
            : buildDisplayValue(newMasked, currentSlots, currentOptions.slotChar)
        const newRaw = extractRaw(newMasked, currentSlots)

        // Update the input element's displayed value
        if (inputRef.current) {
            inputRef.current.value = newDisplay
        }

        setValue(currentOptions.separate ? inputValue : newRaw)
        onChangeRaw?.(newRaw, newDisplay)

        if (isMaskComplete(newMasked, currentSlots)) {
            onComplete?.(newDisplay, newRaw)
        }
    }

    const handleBlur = () => {
        if (autoClear && !isMaskComplete(maskedValue, slots)) {
            setValue('')
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    const input = (
        <InputBase
            {...others}
            id={inputId}
            ref={mergedRef}
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            wrapperProps={hasWrapper ? wrapperProps : { ...getStyles('root'), ...wrapperProps }}
        />
    )

    if (!hasWrapper) {
        return input
    }

    return (
        <InputWrapper
            {...getStyles('root')}
            label={label}
            description={description}
            error={error}
            success={success}
            required={required}
            inputId={inputId}
            labelProps={labelProps}
            descriptionProps={descriptionProps}
            errorProps={errorProps}
        >
            {input}
        </InputWrapper>
    )
})

MaskInput.classes = classes
MaskInput.displayName = '@react-ui/ui/MaskInput'

export namespace MaskInput {
    export type Props = MaskInputProps
    export type StylesNames = MaskInputStylesNames
    export type Factory = MaskInputFactory
}
