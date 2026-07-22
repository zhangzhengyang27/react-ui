import {
    BoxProps,
    DataAttributes,
    ElementProps,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps
} from '../../core'
import { __BaseInputProps, __InputStylesNames, Input, useInputProps } from '../Input'

export type InputBaseStylesNames = __InputStylesNames | 'placeholder'

export interface InputBaseProps
    extends BoxProps,
        __BaseInputProps,
        StylesApiProps<InputBaseFactory>,
        ElementProps<'input', 'size'> {
    __staticSelector?: string
    __stylesApiProps?: Record<string, any>
    wrapperProps?: React.ComponentProps<'div'> & DataAttributes
    multiline?: boolean
    withAria?: boolean
    invalid?: boolean
    sectionPointerEvents?: 'none' | 'auto'
}

export type InputBaseFactory = PolymorphicFactory<{
    props: InputBaseProps
    defaultRef: HTMLInputElement
    defaultComponent: 'input'
    stylesNames: InputBaseStylesNames
}>

const defaultProps = {
    __staticSelector: 'InputBase',
    withAria: true,
    size: 'sm'
} satisfies Partial<InputBaseProps>

export const InputBase = polymorphicFactory<InputBaseFactory>((props, ref) => {
    const { invalid, sectionPointerEvents, ...rest } = props

    const mappedProps = {
        ...rest,
        error: invalid || props.error,
        leftSectionPointerEvents: sectionPointerEvents || props.leftSectionPointerEvents,
        rightSectionPointerEvents: sectionPointerEvents || props.rightSectionPointerEvents
    }

    const { inputProps, wrapperProps, ...others } = useInputProps(
        'InputBase',
        defaultProps,
        mappedProps as typeof props
    )

    return (
        <Input.Wrapper {...wrapperProps}>
            <Input {...inputProps} {...others} ref={ref} />
        </Input.Wrapper>
    )
})

InputBase.classes = { ...Input.classes, ...Input.Wrapper.classes }
;(InputBase as any).varsResolver = (Input as any).varsResolver
InputBase.displayName = '@xiaoye-react/ui/InputBase'

export namespace InputBase {
    export type Props = InputBaseProps
    export type Factory = InputBaseFactory
}
