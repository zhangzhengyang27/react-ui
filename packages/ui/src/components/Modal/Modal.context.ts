import { createSafeContext } from '../../core'

export type ScrollAreaComponent = React.FC<any> | 'div'

export interface ModalContextValue {
    getStyles: (...args: any[]) => any
    yOffset: React.CSSProperties['marginTop']
    scrollAreaComponent?: ScrollAreaComponent
    fullScreen: boolean | undefined
}

export const [ModalProvider, useModalContext] = createSafeContext<ModalContextValue>(
    'Modal component was not found in tree'
)
