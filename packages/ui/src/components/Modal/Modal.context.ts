import { createSafeContext, type GetStylesApi } from '../../core'
import type { ModalFactory } from './Modal'

export interface ModalContextValue {
    getStyles: GetStylesApi<ModalFactory>
    yOffset: React.CSSProperties['marginTop']
    scrollAreaComponent?: React.FC<any>
    fullScreen: boolean | undefined
}

export const [ModalProvider, useModalContext] = createSafeContext<ModalContextValue>(
    'Modal component was not found in tree'
)
