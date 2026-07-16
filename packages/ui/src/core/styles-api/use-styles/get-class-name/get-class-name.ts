import cx from 'clsx'
import { UITheme } from '../../../UIProvider'
import { GetStylesApiOptions } from '../../styles-api.types'
import { getGlobalClassNames } from './get-global-class-names/get-global-class-names'
import { getOptionsClassNames } from './get-options-class-names/get-options-class-names'
import { getResolvedClassNames } from './get-resolved-class-names/get-resolved-class-names'
import { getRootClassName } from './get-root-class-name/get-root-class-name'
import { getSelectorClassName } from './get-selector-class-name/get-selector-class-name'
import { getStaticClassNames } from './get-static-class-names/get-static-class-names'
import { getThemeClassNames } from './get-theme-class-names/get-theme-class-names'
import { getVariantClassName } from './get-variant-class-name/get-variant-class-name'

type __ClassNames =
    | undefined
    | Partial<Record<string, string>>
    | ((
          theme: UITheme,
          props: Record<string, any>,
          ctx: Record<string, any> | undefined
      ) => Partial<Record<string, string>>)

export type _ClassNames = __ClassNames | __ClassNames[]

/**
 * 定义获取类名的配置选项接口
 * @property {UITheme} theme - 主题对象，由hook解析
 * @property {GetStylesApiOptions | undefined} options - 指定选择器的选项，可能包含`classNames`或`className`
 * @property {string[]} themeName - 组件名称数组，用于从`theme.components`获取`classNames`
 * @property {string} selector - 在`getStyles`中指定的类部分
 * @property {string} classNamesPrefix - 所有类名前缀，由hook解析，默认为`ui`
 * @property {_ClassNames} classNames - hook中指定的`classNames`，只添加已解析的`classNames[selector]`
 * @property {Record<string, string>} classes - 类对象，通常从`*.module.css`导入
 * @property {boolean | undefined} unstyled - 是否应将`classes`中的类添加到列表中
 * @property {string | undefined} className - hook中指定的`className`，如果`selector`是`rootSelector`则添加到列表
 * @property {string} rootSelector - hook中指定的`rootSelector`，决定是否添加`className`
 * @property {Record<string, any>} props - 组件props，用作`classNames`和`options.classNames`的上下文
 * @property {Record<string, any> | undefined} stylesCtx - 组件样式上下文，用作`classNames`和`options.classNames`的上下文
 * @property {boolean | undefined} withStaticClasses - 是否添加静态类
 * @property {boolean | undefined} headless - 如果设置，则移除所有UI类
 * @property {Record<string, string>[] | undefined} transformedStyles - `styles`属性转换为CSS-in-JS库的类，例如emotion
 */
export interface GetClassNameOptions {
    theme: UITheme
    options: GetStylesApiOptions | undefined
    themeName: string[]
    selector: string
    classNamesPrefix: string
    classNames: _ClassNames
    classes: Record<string, string>
    unstyled: boolean | undefined
    className: string | undefined
    rootSelector: string
    props: Record<string, any>
    stylesCtx?: Record<string, any> | undefined
    withStaticClasses?: boolean
    headless?: boolean
    transformedStyles?: Record<string, string>[]
}

/**
 * 根据提供的选项生成最终的CSS类名字符串
 * @param {Object} options - 类名生成配置选项
 * @param {Object} options.theme - 主题对象
 * @param {Object} options.options - 组件选项
 * @param {string} options.themeName - 主题名称
 * @param {string} options.selector - CSS选择器
 * @param {string} options.classNamesPrefix - 静态类名前缀
 * @param {Object} options.classNames - 类名映射
 * @param {Object} options.classes - 变体类名
 * @param {boolean} options.unstyled - 是否禁用样式
 * @param {string} options.className - 自定义类名
 * @param {string} options.rootSelector - 根选择器
 * @param {Object} options.props - 组件属性
 * @param {Object} options.stylesCtx - 样式上下文
 * @param {boolean} options.withStaticClasses - 是否包含静态类名
 * @param {boolean} options.headless - 是否无头模式
 * @param {Object} options.transformedStyles - 转换后的样式
 * @returns {string} 合并后的CSS类名字符串
 */
export function getClassName({
    theme,
    options,
    themeName,
    selector,
    classNamesPrefix,
    classNames,
    classes,
    unstyled,
    className,
    rootSelector,
    props,
    stylesCtx,
    withStaticClasses,
    headless,
    transformedStyles
}: GetClassNameOptions) {
    return cx(
        getGlobalClassNames({ theme, options, unstyled: unstyled || headless }),
        getThemeClassNames({ theme, themeName, selector, props, stylesCtx }),
        getVariantClassName({ options, classes, selector, unstyled }),
        getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }),
        getResolvedClassNames({ selector, stylesCtx, theme, classNames: transformedStyles, props }),
        getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
        getRootClassName({ rootSelector, selector, className }),
        getSelectorClassName({ selector, classes, unstyled: unstyled || headless }),
        withStaticClasses &&
            !headless &&
            getStaticClassNames({
                themeName,
                classNamesPrefix,
                selector,
                withStaticClass: options?.withStaticClass
            }),
        options?.className
    )
}
