import cx from 'clsx'
import { UITheme } from '../../../../UIProvider'
import type { _ClassNames } from '../get-class-name'

export interface ResolveClassNamesInput {
    theme: UITheme
    classNames: _ClassNames
    props: Record<string, any>
    stylesCtx: Record<string, any> | undefined
}

const EMPTY_CLASS_NAMES: Partial<Record<string, string>> = {}

/**
 * 合并多个包含类名映射的对象，相同键的类名会使用 cx 函数进行合并
 * @param {Partial<Record<string, string>>[]} objects - 包含类名映射的对象数组
 * @returns {Partial<Record<string, string>>} 合并后的类名映射对象
 */
function mergeClassNames(objects: Partial<Record<string, string>>[]) {
    const merged: Partial<Record<string, string>> = {}

    objects.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (merged[key]) {
                merged[key] = cx(merged[key], value)
            } else {
                merged[key] = value
            }
        })
    })

    return merged
}

/**
 * 解析并合并多个类名字符串或函数
 * @param {ResolveClassNamesInput} params - 输入参数对象
 * @param {Object} params.theme - 主题对象
 * @param {string|string[]|Function|Function[]} params.classNames - 类名字符串或生成类名的函数
 * @param {Object} params.props - 组件属性
 * @param {Object} params.stylesCtx - 样式上下文
 * @returns {string} 合并后的类名字符串
 */
export function resolveClassNames({ theme, classNames, props, stylesCtx }: ResolveClassNamesInput) {
    const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames]
    const resolvedClassNames = arrayClassNames.map(item =>
        typeof item === 'function' ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES
    )

    return mergeClassNames(resolvedClassNames)
}
