import { findElementAncestor } from '../find-element-ancestor/find-element-ancestor'

/**
 * 获取前一个可用元素的索引
 * @param {number} current - 当前元素的索引
 * @param {HTMLButtonElement[]} elements - 按钮元素数组
 * @param {boolean} loop - 是否循环查找
 * @returns {number} 前一个可用元素的索引，如果没有找到则返回当前索引
 */
function getPreviousIndex(current: number, elements: HTMLButtonElement[], loop: boolean) {
    for (let i = current - 1; i >= 0; i -= 1) {
        if (!elements[i].disabled) {
            return i
        }
    }

    if (loop) {
        for (let i = elements.length - 1; i > -1; i -= 1) {
            if (!elements[i].disabled) {
                return i
            }
        }
    }

    return current
}

/**
 * 获取下一个可用的元素索引
 * @param {number} current - 当前索引位置
 * @param {HTMLButtonElement[]} elements - 按钮元素数组
 * @param {boolean} loop - 是否循环查找
 * @returns {number} 下一个可用元素的索引，若找不到则返回当前索引
 */
function getNextIndex(current: number, elements: HTMLButtonElement[], loop: boolean) {
    for (let i = current + 1; i < elements.length; i += 1) {
        if (!elements[i].disabled) {
            return i
        }
    }

    if (loop) {
        for (let i = 0; i < elements.length; i += 1) {
            if (!elements[i].disabled) {
                return i
            }
        }
    }

    return current
}

/**
 * 检查两个按钮元素是否在同一个父级下
 * @param {HTMLButtonElement} target - 第一个按钮元素
 * @param {HTMLButtonElement} sibling - 第二个按钮元素
 * @param {string} parentSelector - 父级选择器
 * @returns {boolean} 如果两个按钮在同一个父级下返回true，否则返回false
 */
function onSameLevel(target: HTMLButtonElement, sibling: HTMLButtonElement, parentSelector: string) {
    return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector)
}

/**
 * 定义获取元素兄弟节点的配置参数
 * @param {string} parentSelector - 用于查找父节点的选择器，例如 '[role="tablist"]', '.ui-Text-root'
 * @param {string} siblingSelector - 用于查找兄弟元素的选择器，例如 '[data-tab]'
 * @param {boolean} [loop] - 是否允许在下一个/上一个索引处循环
 * @param {'vertical' | 'horizontal'} orientation - 确定使用哪些方向键
 * @param {'rtl' | 'ltr'} [dir] - 文本方向
 * @param {boolean} [activateOnFocus] - 是否在键盘事件聚焦时点击元素
 * @param {(event: React.KeyboardEvent<HTMLButtonElement>) => void} [onKeyDown] - 外部键盘按下事件处理函数
 */
interface GetElementsSiblingsInput {
    parentSelector: string
    siblingSelector: string
    loop?: boolean
    orientation: 'vertical' | 'horizontal'
    dir?: 'rtl' | 'ltr'
    activateOnFocus?: boolean
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
}

/**
 * 创建一个处理键盘导航的事件处理器，用于在兄弟元素之间进行焦点切换
 * @param {Object} options - 配置选项
 * @param {string} options.parentSelector - 父元素选择器，用于确定导航范围
 * @param {string} options.siblingSelector - 兄弟元素选择器，用于确定可导航元素
 * @param {Function} [options.onKeyDown] - 自定义键盘事件处理函数
 * @param {boolean} [options.loop=true] - 是否允许在导航到边界时循环
 * @param {boolean} [options.activateOnFocus=false] - 是否在聚焦时自动触发点击事件
 * @param {'rtl'|'ltr'} [options.dir='ltr'] - 方向设置，影响左右箭头的行为
 * @param {'horizontal'|'vertical'} [options.orientation] - 导航方向，决定使用水平还是垂直箭头
 * @returns {Function} 键盘事件处理函数，用于处理方向键导航
 */
export function createScopedKeydownHandler({
    parentSelector,
    siblingSelector,
    onKeyDown,
    loop = true,
    activateOnFocus = false,
    dir = 'ltr',
    orientation
}: GetElementsSiblingsInput) {
    return (event: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(event)

        const elements = Array.from(
            findElementAncestor(event.currentTarget, parentSelector)?.querySelectorAll<HTMLButtonElement>(
                siblingSelector
            ) || []
        ).filter(node => onSameLevel(event.currentTarget, node, parentSelector))

        if (elements.length === 0) {
            return
        }

        const current = elements.findIndex(el => event.currentTarget === el)
        const _nextIndex = getNextIndex(current, elements, loop)
        const _previousIndex = getPreviousIndex(current, elements, loop)
        const nextIndex = dir === 'rtl' ? _previousIndex : _nextIndex
        const previousIndex = dir === 'rtl' ? _nextIndex : _previousIndex

        switch (event.key) {
            case 'ArrowRight': {
                if (orientation === 'horizontal') {
                    event.stopPropagation()
                    event.preventDefault()
                    elements[nextIndex].focus()
                    activateOnFocus && elements[nextIndex].click()
                }

                break
            }

            case 'ArrowLeft': {
                if (orientation === 'horizontal') {
                    event.stopPropagation()
                    event.preventDefault()
                    elements[previousIndex].focus()
                    activateOnFocus && elements[previousIndex].click()
                }

                break
            }

            case 'ArrowUp': {
                if (orientation === 'vertical') {
                    event.stopPropagation()
                    event.preventDefault()
                    elements[_previousIndex].focus()
                    activateOnFocus && elements[_previousIndex].click()
                }

                break
            }

            case 'ArrowDown': {
                if (orientation === 'vertical') {
                    event.stopPropagation()
                    event.preventDefault()
                    elements[_nextIndex].focus()
                    activateOnFocus && elements[_nextIndex].click()
                }

                break
            }

            case 'Home': {
                event.stopPropagation()
                event.preventDefault()
                !elements[0].disabled && elements[0].focus()
                break
            }

            case 'End': {
                event.stopPropagation()
                event.preventDefault()
                const last = elements.length - 1
                !elements[last].disabled && elements[last].focus()
                break
            }
        }
    }
}
