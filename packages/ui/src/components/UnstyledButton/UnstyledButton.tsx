import {
    Box,
    polymorphicFactory,
    useProps,
    useStyles,
    type BoxComponentProps,
    type PolymorphicFactory,
    type StylesApiProps
} from '../../core'
import classes from './UnstyledButton.module.css'
export type UnstyledButtonStylesNames = 'root'

/**
 * 无样式按钮组件的属性接口
 *
 * 继承自 BoxComponentProps 并排除了 'vars' 和 'variant' 属性，
 * 同时扩展了 StylesApiProps<UnstyledButtonFactory> 的样式API属性
 *
 * @property __staticSelector - 可选静态选择器名称，用于自定义样式
 */
export interface UnstyledButtonProps extends Omit<BoxComponentProps, 'vars'>, StylesApiProps<UnstyledButtonFactory> {
    __staticSelector?: string

    /** 原生 button 组件时透传 disabled;非原生组件(如锚)时改为拦截点击 + aria-disabled */
    disabled?: boolean

    // 泛型组件,事件元素类型随 component 变化,用 any 收口避免下游泛型实参不兼容
    onClick?: React.MouseEventHandler<any>
}

/**
 * 默认属性配置对象
 *
 * @property {string} __staticSelector - 静态选择器名称，用于样式隔离
 * @satisfies {Partial<UnstyledButtonProps>} - 确保只包含UnstyledButtonProps的部分属性
 */
const defaultProps = {
    __staticSelector: 'UnstyledButton'
} satisfies Partial<UnstyledButtonProps>

/**
 * 定义无样式按钮的工厂类型
 *
 * @template UnstyledButtonProps - 按钮组件的属性类型
 * @template UnstyledButtonStylesNames - 按钮组件的样式名称类型
 * @defaultComponent 'button' - 默认渲染的HTML元素类型
 * @defaultRef HTMLButtonElement - 默认的ref引用类型
 */
export type UnstyledButtonFactory = PolymorphicFactory<{
    props: UnstyledButtonProps
    stylesNames: UnstyledButtonStylesNames
    defaultComponent: 'button'
    defaultRef: HTMLButtonElement
}>

export const UnstyledButton = polymorphicFactory<UnstyledButtonFactory>(
    (_props: UnstyledButtonProps & { component?: any }, ref) => {
        const props = useProps('UnstyledButton', defaultProps, _props)
        const {
            className,
            component = 'button',
            __staticSelector,
            unstyled,
            classNames,
            styles,
            style,
            attributes,
            disabled,
            onClick,
            ...others
        } = props

        const getStyles = useStyles<UnstyledButtonFactory>({
            name: __staticSelector,
            props,
            classes,
            className,
            style,
            classNames,
            styles,
            unstyled,
            attributes
        })

        const isNativeButton = component === 'button'

        // 锚等非原生可禁用元素上 disabled 属性既不拦截点击也不匹配 :disabled,
        // 改为 onClick 拦截 + aria-disabled 语义
        const handleClick = (event: React.MouseEvent<any>) => {
            if (!isNativeButton && disabled) {
                event.preventDefault()
                return
            }
            onClick?.(event)
        }

        return (
            <Box
                {...getStyles('root', { focusable: true })}
                component={component}
                ref={ref}
                type={isNativeButton ? 'button' : undefined}
                disabled={isNativeButton ? disabled : undefined}
                aria-disabled={!isNativeButton && disabled ? true : undefined}
                {...others}
                onClick={handleClick}
            />
        )
    }
)
