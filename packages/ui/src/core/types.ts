export interface DataAttributes {
    [key: `data-${string}`]: string | number | boolean | undefined
}

/**
 * 以 `component="a"` 渲染的组件（Menu.Item / Avatar / Card / Card.Section）把这三项
 * 随 others 透传给底层锚点元素；集中声明以免各组件各写一遍后漂移。
 */
export interface AnchorPassthroughProps {
    href?: string
    target?: string
    rel?: string
}
