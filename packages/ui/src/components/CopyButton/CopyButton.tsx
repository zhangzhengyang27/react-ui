import { useClipboard } from '@xiaoye-react/hooks'
import { useProps } from '../../core'

export interface CopyButtonProps {
    /** Children callback, provides current status and copy function as an argument */
    children: (payload: { copied: boolean; error: Error | null; copy: () => void }) => React.ReactNode

    /** Value that is copied to the clipboard when the button is clicked */
    value: string

    /** Copied status timeout in ms @default 1000 */
    timeout?: number
}

const defaultProps = {
    timeout: 1000
} satisfies Partial<CopyButtonProps>

export function CopyButton(props: CopyButtonProps) {
    const { children, timeout, value, ...others } = useProps('CopyButton', defaultProps, props)
    const clipboard = useClipboard({ timeout })
    const copy = () => clipboard.copy(value)
    // 透出 error：非 HTTPS 等场景 writeText 失败后消费方才能提示，而非"点击无反应"
    return <>{children({ copy, copied: clipboard.copied, error: clipboard.error, ...others })}</>
}

CopyButton.displayName = '@xiaoye-react/ui/CopyButton'

export namespace CopyButton {
    export type Props = CopyButtonProps
}
