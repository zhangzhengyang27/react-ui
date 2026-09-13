import { factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { InputBase, InputBaseProps } from '../InputBase'
import classes from './Textarea.module.css'

export type TextareaStylesNames = 'root' | 'fieldSizing'

export interface TextareaProps
    extends Omit<InputBaseProps, 'classNames' | 'styles' | 'unstyled' | 'vars' | 'attributes' | 'component'>,
        StylesApiProps<TextareaFactory> {
    /** 可见文本行数 */
    rows?: number

    /** 最小可见行数（用于自动调整大小场景） */
    minRows?: number

    /** 最大可见行数（用于自动调整大小场景） */
    maxRows?: number
}

export type TextareaFactory = Factory<{
    props: TextareaProps
    ref: HTMLTextAreaElement
    stylesNames: TextareaStylesNames
}>

const defaultProps = {} satisfies Partial<TextareaProps>

export const Textarea = factory<TextareaFactory>((_props, ref) => {
    const props = useProps('Textarea', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, rows, minRows, maxRows, wrapperProps, ...others } =
        props

    const getStyles = useStyles<TextareaFactory>({
        name: 'Textarea',
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

    const autosize = minRows !== undefined || maxRows !== undefined

    const inputBaseProps = {
        ...others,
        component: 'textarea',
        multiline: true,
        // autosize 与 rows 互斥：field-sizing: content 由内容撑开，固定 rows 会让
        // min-height 失去意义；不支持的浏览器回退用 minRows 作为初始行数
        rows: autosize ? (minRows ?? rows) : rows,
        __vars: {
            ...(minRows !== undefined ? { '--textarea-min-rows': String(minRows) } : null),
            ...(maxRows !== undefined ? { '--textarea-max-rows': String(maxRows) } : null)
        },
        ...getStyles(autosize ? 'fieldSizing' : 'root', { classNames, styles }),
        wrapperProps: { ...getStyles('root'), ...wrapperProps }
    } as any

    return <InputBase {...inputBaseProps} ref={ref} />
})

Textarea.classes = classes
Textarea.displayName = '@xiaoye-react/ui/Textarea'

export namespace Textarea {
    export type Props = TextareaProps
    export type StylesNames = TextareaStylesNames
    export type Factory = TextareaFactory
}
