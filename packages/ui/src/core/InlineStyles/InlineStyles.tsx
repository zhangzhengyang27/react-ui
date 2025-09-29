import { useMantineStyleNonce } from '../MantineProvider'
import { InlineStylesInput, stylesToString } from './styles-to-string/styles-to-string'

export interface InlineStylesProps
    extends InlineStylesInput,
        Omit<React.ComponentPropsWithoutRef<'style'>, keyof InlineStylesInput> {}

/**
 * 渲染内联样式标签组件
 *
 * @param props - 包含样式配置的对象，将被转换为CSS字符串并注入到style标签中
 * @returns 带有内联样式的React style元素
 * @remarks 自动添加nonce属性用于CSP安全策略，样式通过dangerouslySetInnerHTML注入
 */
export function InlineStyles(props: InlineStylesInput) {
    const nonce = useMantineStyleNonce()
    return (
        <style
            data-mantine-styles="inline"
            nonce={nonce?.()}
            dangerouslySetInnerHTML={{ __html: stylesToString(props) }}
        />
    )
}
