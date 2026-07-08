/** 将字符串值序列化为 JSX 属性可用的带引号字符串，自动处理转义。 */
export function quote(value: string): string {
    return JSON.stringify(value)
}
