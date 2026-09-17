import {
    Box,
    createVarsResolver,
    factory,
    rem,
    useProps,
    useStyles,
    type BoxProps,
    type Factory,
    type StylesApiProps
} from '../../../core'
import classes from '../ActionIcon.module.css'

export type ActionIconGroupStylesNames = 'group'
export type ActionIconGroupCssVariables = {
    group: '--ai-border-width'
}

/**
 * ActionIconGroup 组件属性接口
 * @extends BoxProps
 * @extends StylesApiProps<ActionIconGroupFactory>
 * @property {React.ReactNode} [children] - 仅接受 `ActionIcon` 和 `ActionIcon.GroupSection` 组件
 * @property {'horizontal' | 'vertical'} [orientation='horizontal'] - 分组方向
 * @property {number | string} [borderWidth=1] - 子组件的边框宽度
 */
export interface ActionIconGroupProps extends BoxProps, StylesApiProps<ActionIconGroupFactory> {
    children?: React.ReactNode
    orientation?: 'horizontal' | 'vertical'
    borderWidth?: number | string
}

export type ActionIconGroupFactory = Factory<{
    props: ActionIconGroupProps
    ref: HTMLDivElement
    stylesNames: ActionIconGroupStylesNames
    vars: ActionIconGroupCssVariables
}>

const defaultProps = {
    orientation: 'horizontal'
} satisfies Partial<ActionIconGroupProps>

const varsResolver = createVarsResolver<ActionIconGroupFactory>((_, { borderWidth }) => ({
    group: { '--ai-border-width': rem(borderWidth) }
}))

/**
 * ActionIconGroup 组件，用于创建一组操作按钮的容器
 *
 * @param _props - 组件属性，会被合并到默认属性中
 * @param ref - 转发到内部 Box 组件的 ref
 */
export const ActionIconGroup = factory<ActionIconGroupFactory>((_props, ref) => {
    const props = useProps('ActionIconGroup', defaultProps, _props)
    const {
        className,
        style,
        classNames,
        styles,
        unstyled,
        orientation,
        vars,
        borderWidth,
        variant,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<ActionIconGroupFactory>({
        name: 'ActionIconGroup',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver,
        rootSelector: 'group'
    })

    return (
        <Box
            {...getStyles('group')}
            ref={ref}
            variant={variant}
            mod={[{ 'data-orientation': orientation }, mod]}
            role="group"
            {...others}
        />
    )
})

ActionIconGroup.classes = classes
ActionIconGroup.displayName = '@xiaoye-react/ui/ActionIconGroup'
