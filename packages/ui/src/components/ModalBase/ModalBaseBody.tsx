import { forwardRef, useEffect } from 'react'
import { Box, type BoxProps, type ElementProps } from '../../core'
import { useModalBaseContext } from './ModalBase.context'
import classes from './ModalBase.module.css'

export interface ModalBaseBodyProps extends BoxProps, ElementProps<'div'> {}

export const ModalBaseBody = forwardRef<HTMLDivElement, ModalBaseBodyProps>(({ className, id, ...others }, ref) => {
    const ctx = useModalBaseContext()

    // 标记 body 已挂载，ModalBaseContent 的 aria-describedby 才会渲染
    useEffect(() => {
        ctx.setBodyMounted(true)
        return () => ctx.setBodyMounted(false)
    }, [ctx])

    return (
        <Box
            ref={ref}
            id={id || ctx.getBodyId()}
            className={[classes.body, className].filter(Boolean).join(' ')}
            {...others}
        />
    )
})

ModalBaseBody.displayName = '@xiaoye-react/ui/ModalBaseBody'
