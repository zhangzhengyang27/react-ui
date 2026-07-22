import { useEffect } from 'react'
import { useReactId } from '@xiaoye-react/hooks'
import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import { useComboboxContext } from './Combobox.context'
import classes from './Combobox.module.css'

export interface ComboboxOptionProps extends BoxProps, ElementProps<'div'> {
    /** Option value */
    value: string

    /** Option label, displayed in the dropdown */
    children: React.ReactNode

    /** Determines whether option is disabled */
    disabled?: boolean

    /** Determines whether option is active */
    active?: boolean
}

export type ComboboxOptionFactory = Factory<{
    props: ComboboxOptionProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxOption = factory<ComboboxOptionFactory>((_props, ref) => {
    const props = useProps('ComboboxOption', null, _props)
    const { value, children, disabled, active: activeProp, className, ...others } = props
    const ctx = useComboboxContext()
    // 每个实例稳定的唯一 id：作为注册键区分重复 value 的选项，
    // 并在注册完成前（index 为 -1）充当元素 id 兜底，避免多选项短暂共享 ${dropdownId}--1
    const instanceId = useReactId()
    const index = ctx.options.findIndex(item => item.key === instanceId)
    // index 为 -1（尚未注册）时不能与 activeIndex(-1) 相等即视为激活
    const active = index >= 0 && index === ctx.activeIndex
    const selected = ctx.selectedValues.includes(value)
    // 提取稳定标量作为注册依赖，避免依赖每次渲染新建的 children JSX 导致搜索时全量 unregister+register
    const label = typeof children === 'string' ? children : value

    useEffect(() => {
        ctx.registerOption(instanceId, { value, label, disabled })
        return () => {
            ctx.unregisterOption(instanceId)
        }
    }, [instanceId, label, disabled, value])

    return (
        <Box
            ref={ref}
            role="option"
            id={index >= 0 ? `${ctx.dropdownId}-${index}` : instanceId}
            aria-selected={selected}
            aria-disabled={disabled}
            // useCombobox store 的导航函数依赖 [data-combobox-option] 选择器定位选项，必须渲染该属性
            data-combobox-option
            data-combobox-active={activeProp || active || undefined}
            data-combobox-selected={selected || undefined}
            data-combobox-disabled={disabled || undefined}
            className={[classes.option, className].filter(Boolean).join(' ')}
            {...others}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                if (!disabled) {
                    ctx.onOptionSelect(value)
                }
                others.onClick?.(event)
            }}
            onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
                if (!disabled) {
                    ctx.setActiveIndex(index)
                }
                others.onMouseEnter?.(event)
            }}
        >
            {children}
        </Box>
    )
})

ComboboxOption.displayName = '@xiaoye-react/ui/ComboboxOption'
