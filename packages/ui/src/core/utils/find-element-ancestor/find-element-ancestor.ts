/* eslint-disable no-empty */
/**
 * 查找匹配指定选择器的最近祖先元素
 * @param {HTMLElement} element - 起始查找的子元素
 * @param {string} selector - CSS选择器，用于匹配祖先元素
 * @returns {HTMLElement | null} 返回匹配的祖先元素，若未找到则返回null
 */
export function findElementAncestor(element: HTMLElement, selector: string) {
    let _element: HTMLElement | null = element
    // 向上遍历DOM树，直到找到匹配的祖先元素或到达根节点
    while ((_element = _element.parentElement) && !_element.matches(selector)) {}
    return _element
}
