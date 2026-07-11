/** 将字符串值序列化为 JSX 属性可用的带引号字符串，自动处理转义。 */
export function quote(value: string): string {
    return JSON.stringify(value)
}

/** 将任意控件值序列化为展示代码中的 JSX 属性值。 */
export function formatValueForCode(value: any): string {
    if (typeof value === 'string') {
        return quote(value)
    }
    if (typeof value === 'boolean') {
        return `{${String(value)}}`
    }
    if (typeof value === 'number') {
        return `{${value}}`
    }
    if (Array.isArray(value)) {
        return `{[${value.map(v => JSON.stringify(v)).join(', ')}]}`
    }
    return String(value)
}
