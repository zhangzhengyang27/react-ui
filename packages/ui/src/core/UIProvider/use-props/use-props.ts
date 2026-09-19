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

    // 快路径：组件无 defaultProps 且主题也没有为该组件配置 defaultProps 时，
    // 原样返回 props。此前这里每次都新建 5~6 个对象，既白花时间又破坏 props 引用身份，
    // 让下游所有 useMemo/React.memo 判定永远命中不了。
    const hasOwnDefaults = defaultProps != null && Object.keys(defaultProps).length > 0
    if (!hasOwnDefaults && !names.some(name => theme.components[name]?.defaultProps)) {
        return props as any
    }

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
