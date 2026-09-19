/**
 * demo 生成 code 片段时用组件名做索引，但组件的 displayName 历史上带过
 * @xiaoye-react/dates 等多个包前缀，所以只取最后一段，不与具体包名耦合。
 */
export function componentName(component: { displayName?: string }): string {
    return component.displayName?.split('/').pop() ?? ''
}
