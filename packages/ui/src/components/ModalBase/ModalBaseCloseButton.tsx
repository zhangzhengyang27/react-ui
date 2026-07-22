import { forwardRef } from 'react'
import { CloseButton, type CloseButtonProps } from '../CloseButton'
import { useModalBaseContext } from './ModalBase.context'
import classes from './ModalBase.module.css'

export interface ModalBaseCloseButtonProps extends CloseButtonProps {
    /** Called when close button is clicked */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ModalBaseCloseButton = forwardRef<HTMLButtonElement, ModalBaseCloseButtonProps>(
    ({ className, onClick, ...others }, ref) => {
        const ctx = useModalBaseContext()
        return (
            <CloseButton
                ref={ref}
                {...others}
                onClick={event => {
                    ctx.onClose()
                    onClick?.(event)
                }}
                className={[classes.close, className].filter(Boolean).join(' ')}
                unstyled={ctx.unstyled}
            />
        )
    }
)

ModalBaseCloseButton.displayName = '@xiaoye-react/ui/ModalBaseCloseButton'
