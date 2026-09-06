import { forwardRef, useEffect } from 'react'
import { Box, type BoxProps, type ElementProps } from '../../core'
import { useModalBaseContext } from './ModalBase.context'
import classes from './ModalBase.module.css'

export interface ModalBaseTitleProps extends BoxProps, ElementProps<'h2'> {}

export const ModalBaseTitle = forwardRef<HTMLHeadingElement, ModalBaseTitleProps>(
    ({ className, id, ...others }, ref) => {
        const ctx = useModalBaseContext()

        // 标记 title 已挂载，ModalBaseContent 的 aria-labelledby 才会渲染（读屏器播报对话框名）
        useEffect(() => {
            ctx.setTitleMounted(true)
            return () => ctx.setTitleMounted(false)
        }, [ctx])

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
