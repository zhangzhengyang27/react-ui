import { useMemo } from 'react'

import { useUIContext, useUIStyleNonce } from '../UI.context'
import { useSafeUITheme } from '../UIThemeProvider'
import { convertCssVariables } from '../convert-css-variables'
import { defaultCssVariablesResolver } from './default-css-variables-resolver'

/**
 * 将当前主题经 cssVariablesResolver 解析为 CSS 变量，并以 <style> 标签注入组件树。
 * 标签渲染在树内（SSR 可直出），主题 / resolver / selector 变化时随渲染自动更新。
 */
export function UICssVariables() {
    const theme = useSafeUITheme()
    const { cssVariablesResolver, cssVariablesSelector } = useUIContext()
    const nonce = useUIStyleNonce()

    const css = useMemo(
        () => convertCssVariables((cssVariablesResolver ?? defaultCssVariablesResolver)(theme), cssVariablesSelector),
        [cssVariablesResolver, cssVariablesSelector, theme]
    )

    return (
        <style
            data-ui-styles="css-variables"
            nonce={nonce?.()}
            dangerouslySetInnerHTML={{ __html: css }}
        />
    )
}

UICssVariables.displayName = '@xiaoye-react/ui/UICssVariables'
