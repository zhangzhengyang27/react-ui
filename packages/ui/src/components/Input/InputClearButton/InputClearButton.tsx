import { useContext } from 'react'
import {
    BoxProps,
    ElementProps,
    factory,
    Factory,
    MantineSize,
    StylesApiProps,
    useProps,
    useResolvedStylesApi
} from '../../../core'
import { CloseButton, CloseButtonStylesNames } from '../../CloseButton'
import { InputContext } from '../Input.context'

export interface InputClearButtonProps
    extends BoxProps, StylesApiProps<InputClearButtonFactory>, ElementProps<'button'> {
    size?: MantineSize | (string & {})
}

export type InputClearButtonFactory = Factory<{
    props: InputClearButtonProps
    ref: HTMLButtonElement
    stylesNames: CloseButtonStylesNames
}>

export const InputClearButton = factory<InputClearButtonFactory>((_props, ref) => {
    const props = useProps('InputClearButton', null, _props)
    const { size, variant, vars, classNames, styles, ...others } = props
    const ctx = useContext(InputContext)

    const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<InputClearButtonFactory>({
        classNames,
        styles,
        props
    })

    return (
        <CloseButton
            variant={variant || 'transparent'}
            size={size || ctx?.size || 'sm'}
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            __staticSelector="InputClearButton"
            style={{ pointerEvents: 'all', background: 'var(--input-bg)', ...others.style }}
            {...others}
            ref={ref}
        />
    )
})

InputClearButton.displayName = '@react-ui/ui/InputClearButton'
