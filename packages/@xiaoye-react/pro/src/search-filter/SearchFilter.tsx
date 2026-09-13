import { useState } from 'react'
import { useUncontrolled } from '@xiaoye-react/hooks'
import {
    Box,
    Button,
    createVarsResolver,
    factory,
    getSpacing,
    NativeSelect,
    NumberInput,
    TextInput,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type StylesApiProps,
    type UISpacing
} from '@xiaoye-react/ui'
import classes from './SearchFilter.module.css'

export type SearchFilterStylesNames =
    | 'root'
    | 'fieldsGrid'
    | 'field'
    | 'fieldLabel'
    | 'actions'
    | 'expandButton'

export type SearchFilterCssVariables = {
    root: '--search-filter-columns' | '--search-filter-grid-gap'
}

export type SearchFilterFieldType = 'text' | 'number' | 'select'

export interface SearchFilterField {
    /** 字段名，对应 values 的 key */
    name: string

    /** 字段标签 */
    label?: React.ReactNode

    /** 内置字段类型 @default 'text' */
    type?: SearchFilterFieldType

    /** `select` 类型的选项 */
    data?: (string | { value: string; label: string })[]

    /** 输入占位符 */
    placeholder?: string

    /** 字段在栅格中占据的列数 @default 1 */
    colSpan?: number

    /** 自定义字段渲染，覆盖 type */
    render?: (props: { value: any; onChange: (value: any) => void }) => React.ReactNode
}

export interface SearchFilterProps
    extends BoxProps, StylesApiProps<SearchFilterFactory>, ElementProps<'form', 'onSubmit' | 'onChange'> {
    /** 字段配置 */
    fields?: SearchFilterField[]

    /** 查询值（受控） */
    values?: Record<string, any>

    /** 查询值初始值（非受控） */
    defaultValues?: Record<string, any>

    /** 任一字段变化回调 */
    onChange?: (values: Record<string, any>) => void

    /** 点击查询或回车时触发 */
    onSearch?: (values: Record<string, any>) => void

    /** 点击重置时触发（值已重置为 defaultValues） */
    onReset?: () => void

    /** 栅格列数 @default 3 */
    columns?: number

    /** 收起时显示的字段行数，字段超出后出现展开/收起按钮 @default 1 */
    collapsedRows?: number

    /** 查询按钮文案 @default '查询' */
    searchText?: string

    /** 重置按钮文案 @default '重置' */
    resetText?: string

    /** 查询中禁用按钮与字段 */
    loading?: boolean

    /** 栅格间距 @default 'sm' */
    gap?: UISpacing | number | string
}

export type SearchFilterFactory = Factory<{
    props: SearchFilterProps
    ref: HTMLFormElement
    stylesNames: SearchFilterStylesNames
    vars: SearchFilterCssVariables
}>

const defaultProps = {
    columns: 3,
    collapsedRows: 1,
    searchText: '查询',
    resetText: '重置',
    gap: 'sm'
} satisfies Partial<SearchFilterProps>

const varsResolver = createVarsResolver<SearchFilterFactory>((_, { columns, gap }) => ({
    root: {
        '--search-filter-columns': `${columns}`,
        '--search-filter-grid-gap': getSpacing(gap)
    }
}))

export const SearchFilter = factory<SearchFilterFactory>((_props, ref) => {
    const props = useProps('SearchFilter', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        mod,
        fields,
        values,
        defaultValues,
        onChange,
        onSearch,
        onReset,
        columns,
        collapsedRows,
        searchText,
        resetText,
        loading,
        gap,
        ...others
    } = props

    const getStyles = useStyles<SearchFilterFactory>({
        name: 'SearchFilter',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const [currentValues, setCurrentValues] = useUncontrolled<Record<string, any>>({
        value: values,
        defaultValue: defaultValues,
        finalValue: {},
        onChange
    })

    const [collapsed, setCollapsed] = useState(true)

    const visibleCount = Math.max(1, columns * (collapsedRows ?? 1))
    const isCollapsible = (fields?.length ?? 0) > visibleCount

    const setFieldValue = (name: string, value: any) => {
        setCurrentValues({ ...currentValues, [name]: value })
    }

    const handleSubmit = (event?: React.FormEvent) => {
        event?.preventDefault()
        onSearch?.(currentValues)
    }

    const handleReset = () => {
        setCurrentValues({ ...(defaultValues ?? {}) })
        onReset?.()
    }

    const renderField = (field: SearchFilterField) => {
        const value = currentValues[field.name]

        if (field.render) {
            return field.render({ value, onChange: next => setFieldValue(field.name, next) })
        }

        const shared = {
            size: 'xs' as const,
            label: field.label,
            placeholder: field.placeholder,
            disabled: loading
        }

        if (field.type === 'select') {
            return (
                <NativeSelect
                    {...shared}
                    data={field.data ?? []}
                    value={value ?? ''}
                    onChange={event => setFieldValue(field.name, event.currentTarget.value)}
                    aria-label={typeof field.label === 'string' ? field.label : undefined}
                />
            )
        }

        if (field.type === 'number') {
            return (
                <NumberInput
                    {...shared}
                    value={value ?? ''}
                    onChange={next => setFieldValue(field.name, next)}
                    aria-label={typeof field.label === 'string' ? field.label : undefined}
                />
            )
        }

        return (
            <TextInput
                {...shared}
                value={value ?? ''}
                onChange={event => setFieldValue(field.name, event.currentTarget.value)}
                aria-label={typeof field.label === 'string' ? field.label : undefined}
            />
        )
    }

    const shownFields = isCollapsible && collapsed ? fields?.slice(0, visibleCount) : fields

    return (
        <Box
            component="form"
            ref={ref}
            {...getStyles('root')}
            mod={[{ loading }, mod]}
            onSubmit={event => handleSubmit(event)}
            {...others}
        >
            <div {...getStyles('fieldsGrid')}>
                {shownFields?.map(field => (
                    <div
                        key={field.name}
                        {...getStyles('field', { style: { gridColumn: `span ${field.colSpan ?? 1}` } })}
                    >
                        {renderField(field)}
                    </div>
                ))}
                <div {...getStyles('actions')}>
                    {/* 不传 event 会漏掉 preventDefault：点击的默认行为再触发一次 form onSubmit → onSearch 双触发 */}
                    <Button size="xs" type="submit" loading={loading} onClick={event => handleSubmit(event)}>
                        {searchText}
                    </Button>
                    <Button size="xs" variant="default" disabled={loading} onClick={handleReset}>
                        {resetText}
                    </Button>
                    {isCollapsible && (
                        <Button
                            size="compact-xs"
                            variant="subtle"
                            className={classes.expandButton}
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? '展开' : '收起'}
                        </Button>
                    )}
                </div>
            </div>
        </Box>
    )
})

SearchFilter.classes = classes
;(SearchFilter as any).varsResolver = varsResolver
SearchFilter.displayName = '@xiaoye-react/pro/SearchFilter'

export namespace SearchFilter {
    export type Props = SearchFilterProps
    export type StylesNames = SearchFilterStylesNames
    export type Factory = SearchFilterFactory
    export type Field = SearchFilterField
}
