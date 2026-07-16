import cx from 'clsx'
import { UITheme } from '../../../../UIProvider'
import { GetStylesApiOptions } from '../../../styles-api.types'

/**
 * 获取全局类名的配置选项接口
 * @param {UITheme} theme - UI主题对象
 * @param {boolean | undefined} unstyled - 是否禁用默认样式
 * @param {GetStylesApiOptions | undefined} options - 样式API选项
 */
interface GetGlobalClassNamesOptions {
    theme: UITheme
    unstyled: boolean | undefined
    options: GetStylesApiOptions | undefined
}

export const FOCUS_CLASS_NAMES = {
    always: 'ui-focus-always',
    auto: 'ui-focus-auto',
    never: 'ui-focus-never'
} as const

/**
 * 根据提供的选项生成全局CSS类名
 * @param {GetGlobalClassNamesOptions} options - 包含主题、选项和是否无样式标志的对象
 * @param {Object} options.theme - 主题对象，包含focusClassName和activeClassName等属性
 * @param {Object} options.options - 配置选项，包含focusable和active等标志
 * @param {boolean} options.unstyled - 是否不应用样式
 * @returns {string} 生成的CSS类名字符串
 */
export function getGlobalClassNames({ theme, options, unstyled }: GetGlobalClassNamesOptions) {
    return cx(
        options?.focusable && !unstyled && (theme.focusClassName || FOCUS_CLASS_NAMES[theme.focusRing]),
        options?.active && !unstyled && theme.activeClassName
    )
}
