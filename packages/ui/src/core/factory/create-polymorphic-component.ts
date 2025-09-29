/**
 * 类型工具 ExtendedProps ，用于合并两个类型 Props 和 OverrideProps ，同时确保 OverrideProps 中的属性会覆盖
 * Props 中的同名属性
 */
type ExtendedProps<Props = {}, OverrideProps = {}> = OverrideProps & Omit<Props, keyof OverrideProps>

/**
 * 类型 ElementType ，用于表示 React 中所有可能的元素类型
 */
type ElementType = keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>

/**
 * 类型工具 PropsOf<C> ，用于获取 React 组件或 HTML 元素的属性类型（Props），同时确保这些属性是经过 React 管理的属性）
 */
type PropsOf<C extends ElementType> = React.JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

/** 用于表示一个可选的组件属性 */
type ComponentProp<C> = {
    component?: C
}

/**
 * 类型工具 InheritedProps<C, Props> ，用于合并 React 组件或 HTML 元素的属性类型（ PropsOf<C> ）与用户自定义的属性类型（ Props ）
 * 同时确保用户自定义属性可以覆盖默认属性
 */
type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<PropsOf<C>, Props>

/** 类型工具 PolymorphicRef<C> ，用于获取 React 组件或 HTML 元素的 ref 属性类型 */
export type PolymorphicRef<C> = C extends React.ElementType ? React.ComponentPropsWithRef<C>['ref'] : never

/**
 * 用于描述一个多态组件的 Props 类型。多态组件是指可以动态渲染不同组件或 HTML 元素的组件（例如，通过 component 属性指定渲染类型）
 */
export type PolymorphicComponentProps<C, Props = {}> = C extends React.ElementType
    ? InheritedProps<C, Props & ComponentProp<C>> & {
          ref?: PolymorphicRef<C>
          renderRoot?: (props: any) => any
      }
    : Props & { component: React.ElementType; renderRoot?: (props: Record<string, any>) => any }

/**
 * 工厂函数 createPolymorphicComponent 用于将一个普通的 React 组件转换为支持多态行为的组件。多态组件可以根据传入的 component 属性动态
 * 渲染为不同的 HTML 元素或 React 组件
 */
export function createPolymorphicComponent<ComponentDefaultType, Props, StaticComponents = Record<string, never>>(
    component: any
) {
    type ComponentProps<C> = PolymorphicComponentProps<C, Props>

    type _PolymorphicComponent = <C = ComponentDefaultType>(props: ComponentProps<C>) => React.ReactElement

    type ComponentProperties = Omit<React.FunctionComponent<ComponentProps<any>>, never>

    type PolymorphicComponent = _PolymorphicComponent & ComponentProperties & StaticComponents

    return component as PolymorphicComponent
}
