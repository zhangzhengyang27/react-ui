// 模态栈:用于仲裁嵌套模态框的 Escape 关闭行为,
// 仅栈顶(最后打开)的模态框响应 Escape,避免一次按键关闭所有嵌套模态框。
// 栈为纯内存结构,不依赖 window/document,SSR 安全。
const modalStack: string[] = []

export function pushModal(id: string) {
    if (!modalStack.includes(id)) {
        modalStack.push(id)
    }
}

export function popModal(id: string) {
    const index = modalStack.indexOf(id)
    if (index !== -1) {
        modalStack.splice(index, 1)
    }
}

export function isTopmostModal(id: string) {
    return modalStack[modalStack.length - 1] === id
}
