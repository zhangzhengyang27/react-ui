import { filterProps } from '../../utils'
import { useUITheme } from '../UIThemeProvider'

/**
 * 合并组件的默认属性、主题上下文属性和传入属性
 * @template T - 组件属性类型，必须是对象类型
 * @template U - 默认属性类型，必须是T的部分属性或null/undefined
 * @param {string | string[]} component - 组件名称，复合组件可传名称数组（依次读取各层主题默认属性）
 * @param {U} defaultProps - 组件的默认属性
 * @param {T} props - 传入的组件属性
 * @returns {T & (U extends null | undefined ? {} : {[Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>})} - 合并后的属性对象，优先级: 传入属性 > 主题上下文属性 > 默认属性
 */
export function useProps<T extends Record<string, any>, U extends Partial<T> | null = {}>(
    component: string | string[],
    defaultProps: U,
    props: T
): T &
    (U extends null | undefined
        ? {}
        : {
              [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>
          }) {
    const theme = useUITheme()
    // component 支持传单个名称或名称数组（复合组件依次读取各层主题默认属性）
    const names = Array.isArray(component) ? component : [component]
    const contextProps = names.reduce<Record<string, unknown>>((acc, name) => {
        const payload = theme.components[name]?.defaultProps
        const resolved = typeof payload === 'function' ? payload(theme) : payload
        return { ...acc, ...resolved }
    }, {})

    return { ...defaultProps, ...contextProps, ...filterProps(props) } as T &
        (U extends null | undefined
            ? {}
            : { [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]> })
}
