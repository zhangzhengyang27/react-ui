import { forwardRef } from 'react'
import { Box, type BoxProps, type ElementProps } from '../../core'
import { useModalBaseContext } from './ModalBase.context'
import classes from './ModalBase.module.css'

export interface ModalBaseTitleProps extends BoxProps, ElementProps<'h2'> {}

export const ModalBaseTitle = forwardRef<HTMLHeadingElement, ModalBaseTitleProps>(
    ({ className, id, ...others }, ref) => {
        const ctx = useModalBaseContext()

        return (
            <Box
                ref={ref}
                component="h2"
                id={id || ctx.getTitleId()}
                className={[classes.title, className].filter(Boolean).join(' ')}
                {...others}
            />
        )
    }
)

ModalBaseTitle.displayName = '@xiaoye-react/ui/ModalBaseTitle'
