export type PopoverWidth = React.CSSProperties['width']

export interface PopoverMiddlewares {
    /** 是否在视口空间不足时翻转方向 */
    flip?: boolean
    /** 是否在交叉轴方向 clamp 到视口内 */
    shift?: boolean
    /**
     * 触发元素完全离开视口（被裁剪）时隐藏浮层。
     * 用于常开浮层（如文档中 opened 的展示型 demo）：锚点滚出视口后浮层不再
     * 漂浮在无关内容上，锚点回到视口后恢复显示并正确定位
     */
    hide?: boolean
}
