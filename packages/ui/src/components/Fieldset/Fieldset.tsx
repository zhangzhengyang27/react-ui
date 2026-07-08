import { BoxProps, factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import classes from './Fieldset.module.css'

export type FieldsetStylesNames = 'root' | 'legend'

export interface FieldsetProps extends BoxProps, StylesApiProps<FieldsetFactory> {
    /** Fieldset legend, rendered as `<legend>` */
    legend?: React.ReactNode

    /** Controls disabled state of all child inputs */
    disabled?: boolean

    /** Content rendered inside fieldset */
    children?: React.ReactNode
}

export type FieldsetFactory = Factory<{
    props: FieldsetProps
    ref: HTMLFieldSetElement
    stylesNames: FieldsetStylesNames
}>

const defaultProps = {} satisfies Partial<FieldsetProps>

export const Fieldset = factory<FieldsetFactory>((_props, ref) => {
    const props = useProps('Fieldset', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, legend, disabled, children, ...others } = props

    const getStyles = useStyles<FieldsetFactory>({
        name: 'Fieldset',
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

    return (
        <fieldset {...others} {...getStyles('root')} disabled={disabled} ref={ref}>
            {legend && <legend {...getStyles('legend')}>{legend}</legend>}
            {children}
        </fieldset>
    )
})

Fieldset.classes = classes
Fieldset.displayName = '@react-ui/ui/Fieldset'

export namespace Fieldset {
    export type Props = FieldsetProps
    export type StylesNames = FieldsetStylesNames
    export type Factory = FieldsetFactory
}
