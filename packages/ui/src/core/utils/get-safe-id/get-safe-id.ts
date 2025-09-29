/**
 * 生成带有唯一标识符的安全ID
 * @param {string} uid - 唯一标识符前缀
 * @param {string} errorMessage - 当值无效时抛出的错误信息
 * @returns {function} 返回一个函数，该函数接收字符串值并返回组合后的安全ID
 * @throws {Error} 当输入值不是字符串或为空字符串时抛出错误
 */
export function getSafeId(uid: string, errorMessage: string) {
    return (value: string) => {
        if (typeof value !== 'string' || value.trim().length === 0) {
            throw new Error(errorMessage)
        }

        return `${uid}-${value}`
    }
}
