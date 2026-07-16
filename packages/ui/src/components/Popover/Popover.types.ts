export type PopoverWidth = React.CSSProperties['width']

export interface PopoverMiddlewares {
    /** 是否在视口空间不足时翻转方向 */
    flip?: boolean
    /** 是否在交叉轴方向 clamp 到视口内 */
    shift?: boolean
}
