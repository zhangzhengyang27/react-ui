import { CssVariable } from '../../../../Box'
import { filterProps } from '../../../../utils'

export type ResolvedVars = Partial<Record<string, Record<CssVariable, string | undefined>>>

/**
 * 合并多个 ResolvedVars 对象，相同键的属性会被合并
 * @param {(ResolvedVars | undefined)[]} vars - 需要合并的变量数组，元素可以是 ResolvedVars 对象或 undefined
 * @returns {ResolvedVars} 合并后的 ResolvedVars 对象
 */
export function mergeVars(vars: (ResolvedVars | undefined)[]) {
    return vars.reduce<ResolvedVars>((acc, current) => {
        if (current) {
            Object.keys(current).forEach(key => {
                const currentVars = current[key]
                if (currentVars) {
                    acc[key] = { ...acc[key], ...filterProps(currentVars) }
                }
            })
        }

        return acc
    }, {})
}
