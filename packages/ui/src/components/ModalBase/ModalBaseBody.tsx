import { forwardRef } from 'react'
import { Box, type BoxProps, type ElementProps } from '../../core'
import { useModalBaseContext } from './ModalBase.context'
import classes from './ModalBase.module.css'

export interface ModalBaseBodyProps extends BoxProps, ElementProps<'div'> {}

export const ModalBaseBody = forwardRef<HTMLDivElement, ModalBaseBodyProps>(({ className, id, ...others }, ref) => {
    const ctx = useModalBaseContext()

    return (
        <Box
            ref={ref}
            id={id || ctx.getBodyId()}
            className={[classes.body, className].filter(Boolean).join(' ')}
            {...others}
        />
    )
})

ModalBaseBody.displayName = '@react-ui/ui/ModalBaseBody'
