import { forwardRef } from 'react'
import type { UIThemeComponent } from '../UIProvider'
import type { ClassNames, PartialVarsResolver, Styles, VarsResolver } from '../styles-api'

export type DataAttributes = Record<`data-${string}`, any>

/**
 * 定义组件工厂的配置参数接口
 *
 * @property props - 组件的属性对象
 * @property ctx - 可选，组件上下文
 * @property ref - 可选，组件引用
 * @property stylesNames - 可选，样式名称
 * @property vars - 可选，CSS变量
 * @property variant - 可选，组件变体名称
 * @property staticComponents - 可选，静态组件集合
 * @property compound - 可选，标记是否为复合组件（复合组件不能在UIProvider上设置classNames、styles和vars）
 */
export interface FactoryPayload {
    props: Record<string, any>
    ctx?: any
    ref?: any
    stylesNames?: string
    vars?: any
    variant?: string
    staticComponents?: Record<string, any>
    // 复合组件不能在 UIProvider 上设置 classNames、styles 和 vars
    compound?: boolean
    /** 组件签名类型，由 genericFactory 使用 */
    signature?: any
}

/**
 * 扩展复合组件的默认属性接口
 *
 * @template Payload 继承自FactoryPayload的类型参数
 * @property defaultProps 可选的默认属性对象，包含Payload中props的部分属性及DataAttributes
 */
export interface ExtendCompoundComponent<Payload extends FactoryPayload> {
    defaultProps?: Partial<Payload['props']> & DataAttributes
}

/**
 * 扩展根组件的配置接口，用于自定义组件的行为和样式
 *
 * @template Payload 工厂负载类型参数
 * @property defaultProps 默认属性配置，包含组件props的部分属性、数据属性和可选的组件引用
 * @property classNames 可选的类名配置对象
 * @property styles 可选的样式配置对象
 * @property vars 可选的变量解析器配置
 */
export interface ExtendsRootComponent<Payload extends FactoryPayload> {
    defaultProps?: Partial<Payload['props']> & DataAttributes & { component?: any }
    classNames?: ClassNames<Payload>
    styles?: Styles<Payload>
    vars?: PartialVarsResolver<Payload>
}

/**
 * 根据Payload的compound属性决定扩展组件类型
 *
 * 如果Payload的compound属性为true，则返回ExtendCompoundComponent类型
 * 否则返回ExtendsRootComponent类型
 *
 * @template Payload 扩展组件的有效载荷类型，必须包含compound属性
 */
export type ExtendComponent<Payload extends FactoryPayload> = Payload['compound'] extends true
    ? ExtendCompoundComponent<Payload>
    : ExtendsRootComponent<Payload>

/**
 * 条件类型工具，用于确保输入类型是一个对象类型
 *
 * 如果输入类型 `Input` 已经是一个对象类型（Record<string, any>），则直接返回该类型；
 * 否则返回空对象类型 `{}`。
 *
 * 注意：此处回退必须是 `{}`（交叉类型的单位元），不能用 `Record<string, never>`。
 * 因为 `StaticComponents` 会被交叉（`&`）进 `UIComponentStaticProperties`，
 * `[key: string]: never` 索引签名会把 extend/withProps/classes 及具体子组件赋值全部坍缩为 `never`。
 * `{}` 不引入索引签名，既能避免未声明的静态属性被静默当作 `any`，又不影响其它静态成员。
 *
 * @template Input - 要检查的输入类型
 */
export type StaticComponents<Input> = Input extends Record<string, any> ? Input : {}

/**
 * 定义主题扩展接口，允许通过extend方法扩展组件样式
 *
 * @template Payload 扩展组件时使用的载荷类型，必须继承自FactoryPayload
 * @property extend 方法，接收一个扩展组件输入，返回一个UI主题组件
 */
export interface ThemeExtend<Payload extends FactoryPayload> {
    extend: (input: ExtendComponent<Payload>) => UIThemeComponent
}

/**
 * 定义组件样式类名的类型
 *
 * @template Payload 扩展自FactoryPayload的泛型类型
 * @property classes 样式类名映射对象，当Payload的stylesNames为string类型时，返回Record<string, string>类型，否则返回never
 */
export type ComponentClasses<Payload extends FactoryPayload> = {
    classes: Payload['stylesNames'] extends string ? Record<string, string> : never
}

/**
 * 定义 UI 组件的静态属性类型
 *
 * 该类型组合了多个功能特性：
 * - 主题扩展能力 (ThemeExtend)
 * - 组件类名管理 (ComponentClasses)
 * - 静态子组件定义 (StaticComponents)
 * - 工厂组件属性类型 (FactoryComponentWithProps)
 * - 可选的 CSS 变量解析器静态成员 (varsResolver)
 *
 * @template Payload 扩展自 FactoryPayload 的泛型参数，用于定义组件的基础能力集
 */
export type UIComponentStaticProperties<Payload extends FactoryPayload> = ThemeExtend<Payload> &
    ComponentClasses<Payload> &
    StaticComponents<Payload['staticComponents']> &
    FactoryComponentWithProps<Payload> & {
        varsResolver?: VarsResolver<Payload>
    }

/**
 * 定义一个工厂组件类型，该类型包含一个 `withProps` 方法，用于创建带有部分属性的 React 转发引用组件
 *
 * @template Payload 扩展自 FactoryPayload 的类型参数，包含 props 和 ref 的定义
 *
 * @property withProps 方法接收部分 props 参数，返回一个 React.ForwardRefExoticComponent
 * 该组件类型合并了原始 Payload 的 props、React 的 RefAttributes 以及额外的可选属性：
 * - component: 任意类型的组件
 * - renderRoot: 一个接收属性对象并返回 ReactNode 的渲染函数
 */
export type FactoryComponentWithProps<Payload extends FactoryPayload> = {
    withProps: (props: Partial<Payload['props']>) => React.ForwardRefExoticComponent<
        Payload['props'] &
            React.RefAttributes<Payload['ref']> & {
                component?: any
                renderRoot?: (props: Record<string, any>) => React.ReactNode
            }
    >
}

/**
 * 定义 UI 组件的基础类型
 *
 * @template Payload 扩展自 FactoryPayload 的类型参数，包含组件的 props 和 ref 类型定义
 *
 * 该类型组合了以下特性：
 * - React.ForwardRefExoticComponent 的转发引用能力
 * - 合并 Payload 中定义的 props 类型
 * - 支持通过 component 属性自定义根组件
 * - 支持通过 renderRoot 函数自定义渲染逻辑
 * - 附加 UI 组件的静态属性
 *
 * 用于为 UI UI 库中的组件提供统一的类型定义基础
 */
export type UIComponent<Payload extends FactoryPayload> = React.ForwardRefExoticComponent<
    Payload['props'] &
        React.RefAttributes<Payload['ref']> & {
            component?: any
            renderRoot?: (props: Record<string, any>) => React.ReactNode
        }
> &
    UIComponentStaticProperties<Payload>

/**
 * 返回传入的相同值（恒等函数）
 * @template T 值的类型
 * @param value 任意类型的输入值
 * @returns 与输入值相同的值
 */
export function identity<T>(value: T): T {
    return value
}

/**
 * 高阶函数，用于为给定的React组件添加固定属性
 *
 * @template T 组件类型
 * @template Props 组件属性类型
 * @param {T} Component 需要包装的React组件
 * @returns {(props: Partial<Props>) => T} 返回一个函数，该函数接收固定属性并返回包装后的组件
 *
 * @description
 * 1. 将传入的组件包装成一个新组件，新组件会合并固定属性和传入属性
 * 2. 保留原组件的extend静态方法
 * 3. 设置包装组件的displayName为"WithProps(原组件名)"
 */
export function getWithProps<T, Props>(Component: T): (props: Partial<Props>) => T {
    const _Component = Component as any
    return (fixedProps: any) => {
        const Extended = forwardRef((props, ref) => <_Component {...fixedProps} {...props} ref={ref as any} />) as any
        Extended.extend = _Component.extend
        Extended.classes = _Component.classes
        Extended.varsResolver = _Component.varsResolver
        Extended.displayName = `WithProps(${_Component.displayName})`
        return Extended
    }
}

/**
 * 创建一个可扩展的React组件工厂函数
 *
 * @template Payload 组件工厂的载荷类型，必须包含ref和props属性
 * @param ui 组件的渲染函数，使用React.forwardRef包装
 * @returns 返回一个可扩展的UI组件，包含extend和withProps扩展方法
 *
 * @remarks
 * - extend方法用于扩展组件功能
 * - withProps方法用于创建带有固定props的新组件
 */
export function factory<Payload extends FactoryPayload>(
    ui: React.ForwardRefRenderFunction<Payload['ref'], Payload['props']>
) {
    // 包装 render 函数，确保 React 19 forwardRef 始终接收 (props, ref) 双参数，
    // 避免部分组件只声明 _props 单参数时触发运行时警告/SSR 组件类型错误
    const Component = forwardRef((props: Payload['props'], ref: React.Ref<Payload['ref']>) => ui(props, ref)) as any

    Component.extend = identity as any
    Component.withProps = (fixedProps: any) => {
        const Extended = forwardRef((props, ref) => <Component {...fixedProps} {...props} ref={ref as any} />) as any
        Extended.extend = Component.extend
        Extended.classes = Component.classes
        Extended.varsResolver = Component.varsResolver
        Extended.displayName = `WithProps(${Component.displayName})`
        return Extended
    }

    return Component as UIComponent<Payload>
}

export function genericFactory<Payload extends FactoryPayload>(ui: Payload['signature']) {
    return factory(ui as any) as unknown as Payload['signature'] &
        UIComponentStaticProperties<Payload> & { displayName?: string }
}
