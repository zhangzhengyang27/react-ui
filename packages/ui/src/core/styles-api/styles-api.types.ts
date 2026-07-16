import type { CSSProperties, UIStyleProp } from '../Box'
import type { FactoryPayload } from '../factory'
import type { UITheme } from '../UIProvider'
import { PartialVarsResolver } from './create-vars-resolver/create-vars-resolver'

/**
 * 定义获取样式API的配置选项接口
 * @property {string} [className] - 自定义类名
 * @property {UIStyleProp} [style] - 内联样式对象
 * @property {boolean} [focusable] - 是否可获取焦点
 * @property {boolean} [active] - 是否为激活状态
 * @property {ClassNames<{ props: any; stylesNames: string }>} [classNames] - 样式类名对象
 * @property {Styles<{ props: any; stylesNames: string }>} [styles] - 样式对象
 * @property {string} [variant] - 组件变体名称
 * @property {Record<string, any>} [props] - 额外属性对象
 * @property {boolean} [withStaticClass] - 是否包含静态类名
 */
export interface GetStylesApiOptions {
    className?: string
    style?: UIStyleProp
    focusable?: boolean
    active?: boolean
    classNames?: ClassNames<{ props: any; stylesNames: string }>
    styles?: Styles<{ props: any; stylesNames: string }>
    variant?: string
    props?: Record<string, any>
    withStaticClass?: boolean
}

/**
 * 定义样式API记录类型，根据Payload的compound属性决定样式记录的结构
 * @template Payload 工厂负载类型，必须包含stylesNames、props和ctx属性
 * @template DataType 样式数据类型
 * @typedef {Payload['compound'] extends true
 *   ? Payload['stylesNames'] extends string
 *     ? StylesRecord<Payload['stylesNames'], DataType>
 *     : never
 *   : Payload['stylesNames'] extends string
 *     ? StylesRecord<Payload['stylesNames'], DataType> | ((theme: UITheme, props: Payload['props'], ctx: Payload['ctx']) => StylesRecord<Payload['stylesNames'], DataType>)
 *     : never} StylesApiRecord
 */
export type StylesApiRecord<Payload extends FactoryPayload, DataType> = Payload['compound'] extends true
    ? Payload['stylesNames'] extends string
        ? StylesRecord<Payload['stylesNames'], DataType>
        : never
    : Payload['stylesNames'] extends string
      ?
            | StylesRecord<Payload['stylesNames'], DataType>
            | ((
                  theme: UITheme,
                  props: Payload['props'],
                  ctx: Payload['ctx']
              ) => StylesRecord<Payload['stylesNames'], DataType>)
      : never

/**
 * 定义样式API记录类型，将Payload映射到CSSProperties
 * @template Payload 扩展自FactoryPayload的泛型类型参数
 * @typedef {StylesApiRecord<Payload, CSSProperties>} Styles
 */
export type Styles<Payload extends FactoryPayload> = StylesApiRecord<Payload, CSSProperties>

/**
 * 定义样式API的类名记录类型
 * @template Payload 扩展自FactoryPayload的类型参数
 * @typedef {StylesApiRecord<Payload, string>} ClassNames
 */
export type ClassNames<Payload extends FactoryPayload> = StylesApiRecord<Payload, string>

/**
 * 表示一个包含 StylesApiRecord 或 undefined 的数组类型
 * @template Payload 扩展自 FactoryPayload 的泛型类型参数
 * @typedef {Array<StylesApiRecord<Payload, string> | undefined>} ClassNamesArray
 */
export type ClassNamesArray<Payload extends FactoryPayload> = (StylesApiRecord<Payload, string> | undefined)[]

/**
 * 定义基于 FactoryPayload 的样式属性类型
 * @template Payload - 工厂载荷类型，必须包含 stylesNames 和 compound 属性
 * @typedef {object} Attributes
 * @property {Payload['stylesNames']} [key] - 可选的样式名称键，值为包含任意属性的对象
 * @description 当 Payload 的 stylesNames 为字符串且 compound 不为 true 时，
 *              返回一个以 stylesNames 为键的可选属性对象类型；否则返回 never 类型
 */
export type Attributes<Payload extends FactoryPayload> = Payload['stylesNames'] extends string
    ? Payload['compound'] extends true
        ? never
        : { [K in Payload['stylesNames']]?: Record<string, any> }
    : never

/**
 * 定义一个部分样式记录类型，用于表示可选的样式名称到值的映射
 * @template StylesNames 样式名称的字符串字面量类型
 * @template Payload 样式值的类型
 * @typedef {Partial<Record<StylesNames, Payload>>} StylesRecord
 */
export type StylesRecord<StylesNames extends string, Payload> = Partial<Record<StylesNames, Payload>>

/**
 * 定义样式API的属性接口
 * @template Payload 扩展自FactoryPayload的泛型类型
 * @property {boolean} [unstyled] - 是否禁用默认样式
 * @property {Payload['variant'] | (string & {})} [variant] - 组件变体名称，可以是Payload中定义的variant或任意字符串
 * @property {ClassNames<Payload>} [classNames] - 自定义类名映射
 * @property {Styles<Payload>} [styles] - 自定义样式对象
 * @property {PartialVarsResolver<Payload>} [vars] - CSS变量解析器
 * @property {Attributes<Payload>} [attributes] - 自定义HTML属性
 */
export interface StylesApiProps<Payload extends FactoryPayload> {
    unstyled?: boolean
    variant?: Payload['variant'] extends string ? Payload['variant'] | (string & {}) : string
    classNames?: ClassNames<Payload>
    styles?: Styles<Payload>
    vars?: PartialVarsResolver<Payload>
    attributes?: Attributes<Payload>
}

/**
 * 扩展了 StylesApiProps 接口，排除了 'unstyled' 和 'attributes' 属性
 * @template Payload 继承自 FactoryPayload 的泛型类型参数
 * @extends Omit<StylesApiProps<Payload>, 'unstyled' | 'attributes'>
 */
export interface CompoundStylesApiProps<Payload extends FactoryPayload>
    extends Omit<StylesApiProps<Payload>, 'unstyled' | 'attributes'> {}
