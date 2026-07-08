import { forwardRef } from 'react'
import { Box, type BoxProps, type ElementProps } from '../../core'
import { useModalBaseContext } from './ModalBase.context'
import classes from './ModalBase.module.css'

export interface ModalBaseHeaderProps extends BoxProps, ElementProps<'header'> {}

export const ModalBaseHeader = forwardRef<HTMLElement, ModalBaseHeaderProps>(({ className, ...others }, ref) => {
    const ctx = useModalBaseContext()
    return (
        <Box
            ref={ref}
            component="header"
            className={[classes.header, className].filter(Boolean).join(' ')}
            {...others}
        />
    )
})

ModalBaseHeader.displayName = '@mantine/core/ModalBaseHeader'
