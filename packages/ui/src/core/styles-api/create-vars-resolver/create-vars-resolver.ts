import { CssVariable } from '../../Box'
import { FactoryPayload } from '../../factory'
import { MantineTheme } from '../../MantineProvider'

/**
 * 将 CSS 变量类型转换为对应的 Record 类型
 * @template V - 包含 CSS 变量的对象类型
 * @template Key - V 的键类型
 * @typedef {Object} TransformVars
 * @property {V[Key] extends CssVariable ? Record<V[Key], string | undefined> : never} [Key] - 如果值是 CSS 变量类型，则转换为 Record 类型，否则为 never
 */
export type TransformVars<V> = {
    [Key in keyof V]: V[Key] extends CssVariable ? Record<V[Key], string | undefined> : never
}

/**
 * 定义部分转换变量的类型，用于处理CSS变量的部分转换
 * @template V 原始变量类型
 * @typedef {Object} PartialTransformVars
 * @property {V[Key] extends CssVariable ? Partial<Record<V[Key], string | undefined>> : never} [Key in keyof V] - 对于每个键，如果是CSS变量则生成可选记录，否则为never
 */
export type PartialTransformVars<V> = {
    [Key in keyof V]: V[Key] extends CssVariable ? Partial<Record<V[Key], string | undefined>> : never
}

/**
 * 解析主题变量，根据主题、属性和上下文生成转换后的变量
 * @param {MantineTheme} theme - Mantine主题对象
 * @param {Payload['props']} props - 组件属性
 * @param {Payload['ctx']} ctx - 上下文对象
 * @returns {TransformVars<Payload['vars']>} 转换后的主题变量
 */
export type VarsResolver<Payload extends FactoryPayload> = (
    theme: MantineTheme,
    props: Payload['props'],
    ctx: Payload['ctx']
) => TransformVars<Payload['vars']>

/**
 * 定义部分变量解析器类型，用于根据主题和属性计算部分变量值
 * @template Payload 工厂负载类型，包含 props、ctx 和 vars 属性
 * @param {MantineTheme} theme - Mantine 主题对象
 * @param {Payload['props']} props - 组件属性
 * @param {Payload['ctx']} ctx - 上下文对象
 * @returns {PartialTransformVars<Payload['vars']>} 转换后的部分变量对象
 */
export type PartialVarsResolver<Payload extends FactoryPayload> = (
    theme: MantineTheme,
    props: Payload['props'],
    ctx: Payload['ctx']
) => PartialTransformVars<Payload['vars']>

/**
 * 创建一个变量解析器函数
 * @template Payload 扩展自 FactoryPayload 的泛型类型
 * @param {VarsResolver<Payload>} resolver - 变量解析器函数
 * @returns {VarsResolver<Payload>} 传入的解析器函数
 */
export function createVarsResolver<Payload extends FactoryPayload>(resolver: VarsResolver<Payload>) {
    return resolver
}
