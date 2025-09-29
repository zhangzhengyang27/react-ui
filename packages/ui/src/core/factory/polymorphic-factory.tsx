import { forwardRef } from 'react'
import { PolymorphicComponentProps } from './create-polymorphic-component'
import { ComponentClasses, FactoryPayload, identity, StaticComponents, ThemeExtend } from './factory'

/**
 * 定义多态工厂的有效载荷接口，扩展基础工厂载荷
 *
 * @property defaultComponent - 默认的组件类型
 * @property defaultRef - 默认的引用类型
 */
export interface PolymorphicFactoryPayload extends FactoryPayload {
    defaultComponent: any
    defaultRef: any
}

/**
 * 定义一个多态组件工厂类型，支持通过 withProps 方法创建具有固定属性的组件变体
 *
 * @template Payload 扩展自 PolymorphicFactoryPayload 的类型，包含默认组件和属性配置
 * @template C 组件类型，默认为 Payload 中的 defaultComponent
 * @template L 组件类型，默认为 C
 *
 * @property withProps 方法用于创建具有固定属性的组件变体
 * @param fixedProps 要固定的组件属性
 * @returns 返回一个接收动态属性并渲染组件的函数
 */
export type PolymorphicComponentWithProps<Payload extends PolymorphicFactoryPayload> = {
    withProps: <C = Payload['defaultComponent']>(
        fixedProps: PolymorphicComponentProps<C, Payload['props']>
    ) => <L = C>(props: PolymorphicComponentProps<L, Payload['props']>) => React.ReactElement
}

/**
 * 创建一个多态组件工厂函数，用于生成具有多态特性的React组件
 *
 * @template Payload 扩展自PolymorphicFactoryPayload的类型参数，定义组件的默认属性、引用和静态组件等
 * @param ui React的forwardRef渲染函数，接收props和ref作为参数
 *
 * @returns 返回一个多态组件，具有以下特性：
 * - 支持多态组件属性（PolymorphicComponentProps）
 * - 支持主题扩展（ThemeExtend）
 * - 支持组件类名（ComponentClasses）
 * - 支持静态子组件（StaticComponents）
 * - 提供withProps方法用于固定部分props
 * - 提供extend方法用于扩展组件
 */
export function polymorphicFactory<Payload extends PolymorphicFactoryPayload>(
    ui: React.ForwardRefRenderFunction<Payload['defaultRef'], Payload['props']>
) {
    type ComponentProps<C> = PolymorphicComponentProps<C, Payload['props']>

    type _PolymorphicComponent = <C = Payload['defaultComponent']>(props: ComponentProps<C>) => React.ReactElement

    type ComponentProperties = Omit<React.FunctionComponent<ComponentProps<any>>, never>

    type PolymorphicComponent = _PolymorphicComponent &
        ComponentProperties &
        ThemeExtend<Payload> &
        ComponentClasses<Payload> &
        PolymorphicComponentWithProps<Payload> &
        StaticComponents<Payload['staticComponents']>

    const Component = forwardRef(ui) as unknown as PolymorphicComponent

    /**
     * 创建一个高阶组件，将固定的props注入到原始组件中
     * @param fixedProps 要固定注入到组件中的props对象
     * @returns 包装后的组件，保留原始组件的extend方法和displayName
     */
    Component.withProps = (fixedProps: any) => {
        const Extended = forwardRef((props, ref) => <Component {...fixedProps} {...props} ref={ref as any} />) as any
        Extended.extend = Component.extend
        Extended.displayName = `WithProps(${Component.displayName})`
        return Extended
    }

    Component.extend = identity as any

    return Component as PolymorphicComponent
}

/**
 * 定义一个Mantine的多态组件类型，支持组件多态性和主题扩展
 *
 * @template Payload 扩展自PolymorphicFactoryPayload的类型参数，包含组件的默认配置
 * @template C 可选的组件类型参数，默认为Payload中的defaultComponent
 *
 * 该类型组合了以下特性：
 * - 多态组件函数签名
 * - React函数组件基础类型
 * - 主题扩展能力(ThemeExtend)
 * - 组件类名管理(ComponentClasses)
 * - 多态组件属性支持(PolymorphicComponentWithProps)
 * - 静态子组件支持(StaticComponents)
 */
export type MantinePolymorphicComponent<Payload extends PolymorphicFactoryPayload> = (<C = Payload['defaultComponent']>(
    props: PolymorphicComponentProps<C, Payload['props']>
) => React.ReactElement) &
    Omit<React.FunctionComponent<PolymorphicComponentProps<any, Payload['props']>>, never> &
    ThemeExtend<Payload> &
    ComponentClasses<Payload> &
    PolymorphicComponentWithProps<Payload> &
    StaticComponents<Payload['staticComponents']>
