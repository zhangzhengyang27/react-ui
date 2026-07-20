import type { UITheme } from '../../core/UIProvider'

/**
 * 扩展的 CSS 属性接口
 *
 * 继承自 React.CSSProperties，并允许添加任意自定义 CSS 属性。主要用于支持 UI 组件中需要扩展 CSS 属性的场景
 *
 * @example
 * const styles: CSSProperties = {
 *   '--custom-property': 'value',
 *   color: 'red'
 * }
 *
 * 注意：此处保留宽松的 `[key: string]: any` 索引签名是有意为之。`UIStyleProp` 是递归联合类型
 * （`UIStyle | UIStyle[] | UIStyleProp[]`），且各组件以标准 `React.CSSProperties` 传入 `style`，
 * 收紧为 `` [key: `--${string}`] `` 会破坏全库 style 属性的可赋值性（需配套重构 UIStyleProp）。
 */
export interface CSSProperties extends React.CSSProperties {
    [key: string]: any
}

/**
 * UI 样式类型
 *
 * 可以是：
 * 1. 静态 CSS 属性对象
 * 2. 接收主题参数的函数，返回 CSS 属性对象
 */
type UIStyle = CSSProperties | ((theme: UITheme) => CSSProperties)

/**
 * UI 样式属性类型
 *
 * 支持以下形式：
 * - 单个 UIStyle
 * - UIStyle 数组
 * - 嵌套的 UIStyleProp 数组
 * - undefined（可选属性）
 */
export type UIStyleProp = UIStyle | UIStyle[] | UIStyleProp[] | undefined

/**
 * CSS 变量类型
 *
 * 表示以 '--' 开头的 CSS 自定义属性
 * @example
 * type MyVar = CssVariable // 等同于 `--${string}`
 */
export type CssVariable = `--${string}`

/**
 * CSS 变量集合类型
 *
 * 表示一组 CSS 变量的键值对
 * @template Variable 扩展的变量名类型，默认为 CssVariable
 */
export type CssVariables<Variable extends string = CssVariable> = Partial<Record<Variable, string>>

/**
 * CSS 变量配置类型
 *
 * 可以是：
 * 1. 静态 CSS 变量集合
 * 2. 接收主题参数的函数，返回 CSS 变量集合
 * 3. CssVars 数组（用于合并多个配置）
 * @template Variable 扩展的变量名类型
 */
export type CssVars<Variable extends string = CssVariable> =
    | CssVariables<Variable>
    | ((theme: UITheme) => CssVariables<Variable>)
    | CssVars<Variable>[]

/**
 * CSS 变量属性类型
 *
 * 用于组件 props 中接收 CSS 变量配置
 * 可以是单个 CssVars 或 CssVars 数组
 * @template Variable 扩展的变量名类型
 */
export type CssVarsProp<Variable extends string = CssVariable> = CssVars<Variable> | CssVars<Variable>[]
