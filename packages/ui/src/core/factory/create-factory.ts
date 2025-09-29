import { FactoryPayload } from './factory'
import { PolymorphicFactoryPayload } from './polymorphic-factory'

/**
 * 泛型工厂类型，用于包装指定的载荷类型
 * @template Payload 扩展自FactoryPayload的泛型类型参数
 * @typedef {Payload} Factory
 */
export type Factory<Payload extends FactoryPayload> = Payload

/**
 * 定义一个多态工厂类型，用于包装指定的载荷类型
 * @template Payload 扩展自 PolymorphicFactoryPayload 的载荷类型
 * @typedef {Payload} PolymorphicFactory
 */
export type PolymorphicFactory<Payload extends PolymorphicFactoryPayload> = Payload
