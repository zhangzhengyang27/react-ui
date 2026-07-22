import { forwardRef } from 'react'
import cx from 'clsx'
import { createPolymorphicComponent } from '../../core/factory/index'

import { InlineStyles } from '../../core/InlineStyles'
import { UIBreakpoint, useUISxTransform, useUITheme } from '../../core/UIProvider'
import { isNumberLike } from '../../core/utils'
import type { CssVarsProp, UIStyleProp } from './Box.types'
import { getBoxMod } from './get-box-mod/get-box-mod'
import { getBoxStyle } from './get-box-style/get-box-style'
import { extractStyleProps, UIStyleProps, parseStyleProps, STYLE_PROPS_DATA } from './style-props'
import { useRandomClassName } from './use-random-classname/use-random-classname'

// 定义 Mod 类型：可以是键值对对象或字符串
export type Mod = Record<string, any> | string
// 定义 BoxMod 类型：可以是 Mod、Mod 数组或 BoxMod 数组
export type BoxMod = Mod | Mod[] | BoxMod[]

// Box 组件的属性接口，继承自 UIStyleProps
export interface BoxProps extends UIStyleProps {
    /** 添加到根元素的类名（可选） */
    className?: string

    /** 内联样式，可以订阅 UIProvider 中定义的主题 */
    style?: UIStyleProp

    /** 定义在根元素上的 CSS 变量 */
    __vars?: CssVarsProp

    /** 传递给 HTML 元素的 size 属性 */
    __size?: string

    /** 从指定断点开始隐藏组件（display: none） */
    hiddenFrom?: UIBreakpoint

    /** 在指定断点以下隐藏组件（display: none） */
    visibleFrom?: UIBreakpoint

    /** 在浅色主题下隐藏组件（display: none） */
    lightHidden?: boolean

    /** 在深色主题下隐藏组件（display: none） */
    darkHidden?: boolean

    /** 元素修饰符，转换为 data- 属性（例如 { 'data-size': 'xl' }），假值会被移除 */
    mod?: BoxMod
}

/** 定义 ElementProps 类型：排除 'style' 和 PropsToOmit 后的组件属性 */
export type ElementProps<ElementType extends React.ElementType, PropsToOmit extends string = never> = Omit<
    React.ComponentPropsWithoutRef<ElementType>,
    'style' | PropsToOmit
>

/** Box 组件的扩展属性接口 */
export interface BoxComponentProps extends BoxProps {
    /** 从父组件传递的变体，设置 data-variant */
    variant?: string

    /** 从父组件传递的尺寸，如果值不是数字则设置 data-size */
    size?: string | number
}

// 定义 _Box 组件
const _Box = forwardRef<HTMLDivElement, BoxComponentProps & { component: any; className: string; renderRoot: any }>(
    // 组件参数
    (
        {
            component,
            style,
            __vars,
            className,
            variant,
            mod,
            size,
            hiddenFrom,
            visibleFrom,
            lightHidden,
            darkHidden,
            renderRoot,
            __size,
            ...others
        },
        ref
    ) => {
        const theme = useUITheme()
        const Element = component || 'div'
        const { styleProps, rest } = extractStyleProps(others)
        const useSxTransform = useUISxTransform()
        const transformedSx = useSxTransform?.()?.(styleProps.sx)
        const responsiveClassName = useRandomClassName()
        const parsedStyleProps = parseStyleProps({
            styleProps,
            theme,
            data: STYLE_PROPS_DATA
        })

        const props = {
            ref,
            style: getBoxStyle({
                theme,
                style,
                vars: __vars,
                styleProps: parsedStyleProps.inlineStyles
            }),
            className: cx(className, transformedSx, {
                [responsiveClassName]: parsedStyleProps.hasResponsiveStyles,
                'ui-light-hidden': lightHidden,
                'ui-dark-hidden': darkHidden,
                [`ui-hidden-from-${hiddenFrom}`]: hiddenFrom,
                [`ui-visible-from-${visibleFrom}`]: visibleFrom
            }),
            'data-variant': variant,
            'data-size': isNumberLike(size) ? undefined : size || undefined,
            size: __size,
            ...getBoxMod(mod),
            ...rest
        }

        return (
            <>
                {parsedStyleProps.hasResponsiveStyles && (
                    <InlineStyles
                        selector={`.${responsiveClassName}`}
                        styles={parsedStyleProps.styles}
                        media={parsedStyleProps.media}
                    />
                )}

                {typeof renderRoot === 'function' ? renderRoot(props) : <Element {...props} />}
            </>
        )
    }
)

_Box.displayName = '@xiaoye-react/ui/Box'

// 导出 Box 组件，支持多态组件模式
export const Box = createPolymorphicComponent<'div', BoxComponentProps>(_Box)
