export interface RGBA {
    r: number
    g: number
    b: number
    a: number
}

/**
 * 检查字符串是否为有效的十六进制颜色值
 * @param hex - 待检查的字符串
 * @returns 如果是有效的十六进制颜色值则返回 true，否则返回 false
 */
function isHexColor(hex: string): boolean {
    const HEX_REGEXP = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i

    return HEX_REGEXP.test(hex)
}

/**
 * 将十六进制颜色字符串转换为 RGBA 对象
 * @param color - 十六进制颜色字符串（如 "#ff0000" 或 "#f00"）
 * @returns 包含 r, g, b, a 属性的 RGBA 对象
 */
function hexToRgba(color: string): RGBA {
    let hexString = color.replace('#', '')

    if (hexString.length === 3) {
        const shorthandHex = hexString.split('')
        hexString = [
            shorthandHex[0],
            shorthandHex[0],
            shorthandHex[1],
            shorthandHex[1],
            shorthandHex[2],
            shorthandHex[2]
        ].join('')
    }

    if (hexString.length === 4) {
        const shorthandHex = hexString.split('')
        hexString = [
            shorthandHex[0],
            shorthandHex[0],
            shorthandHex[1],
            shorthandHex[1],
            shorthandHex[2],
            shorthandHex[2],
            shorthandHex[3],
            shorthandHex[3]
        ].join('')
    }

    if (hexString.length === 8) {
        const alpha = parseInt(hexString.slice(6, 8), 16) / 255

        return {
            r: parseInt(hexString.slice(0, 2), 16),
            g: parseInt(hexString.slice(2, 4), 16),
            b: parseInt(hexString.slice(4, 6), 16),
            a: alpha
        }
    }

    const parsed = parseInt(hexString, 16)
    const r = (parsed >> 16) & 255
    const g = (parsed >> 8) & 255
    const b = parsed & 255

    return {
        r,
        g,
        b,
        a: 1
    }
}

/**
 * 将 RGB 或 RGBA 颜色字符串转换为 RGBA 对象
 * @param color - RGB 或 RGBA 颜色字符串，支持传统逗号语法（"rgb(255, 0, 0)"、"rgba(255, 0, 0, 0.5)"）
 *   与现代空格语法（"rgb(255 0 0)"、"rgb(255 0 0 / 0.5)"、"rgb(255 0 0 / 50%)"）
 * @returns 包含 r, g, b, a 属性的 RGBA 对象
 */
function parseAlphaToken(token: string) {
    return token.endsWith('%') ? parseFloat(token) / 100 : parseFloat(token)
}

function rgbStringToRgba(color: string): RGBA {
    const body = color.replace(/^rgba?\(/i, '').replace(/\)\s*$/, '').trim()
    const [mainPart, alphaPart] = body.split('/')
    const tokens = mainPart
        .trim()
        .split(/[\s,]+/)
        .filter(Boolean)
    const rgbTokens = tokens.slice(0, 3)
    const legacyAlpha = tokens[3]
    const parseRgbToken = (token: string) =>
        // rgb(100% 0% 0%) 百分比写法：按 255 折算
        token.endsWith('%') ? (parseFloat(token) / 100) * 255 : Number(token)
    const [r, g, b] = rgbTokens.map(parseRgbToken)

    let a: number | undefined
    if (alphaPart !== undefined) {
        const alphaStr = alphaPart.trim()
        a = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr)
    } else {
        a = legacyAlpha === undefined ? undefined : parseAlphaToken(legacyAlpha)
    }

    return { r, g, b, a: a ?? 1 }
}

/**
 * 将 HSL 或 HSLA 颜色字符串转换为 RGBA 对象
 * @param hslaString - HSL 或 HSLA 颜色字符串，支持传统逗号语法（"hsl(120, 100%, 50%)"、"hsla(120, 100%, 50%, 0.5)"）
 *   与现代空格语法（"hsl(120 100% 50%)"、"hsl(120 100% 50% / 0.5)"、"hsl(120 100% 50% / 50%)"）
 * @returns 包含 r, g, b, a 属性的 RGBA 对象
 */
function hslStringToRgba(hslaString: string): RGBA {
    const body = hslaString.replace(/^hsla?\(/i, '').replace(/\)\s*$/, '').trim()
    const [mainPart, alphaPart] = body.split('/')
    const tokens = mainPart
        .trim()
        .split(/[\s,]+/)
        .filter(Boolean)

    if (tokens.length < 3) {
        return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }
    }

    const h = parseFloat(tokens[0])
    const s = parseFloat(tokens[1]) / 100
    const l = parseFloat(tokens[2]) / 100

    let a: number | undefined
    if (alphaPart !== undefined) {
        const alphaStr = alphaPart.trim()
        a = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr)
    } else if (tokens[3] !== undefined) {
        a = parseFloat(tokens[3])
    }

    const chroma = (1 - Math.abs(2 * l - 1)) * s
    const huePrime = h / 60
    const x = chroma * (1 - Math.abs((huePrime % 2) - 1))
    const m = l - chroma / 2

    let r: number
    let g: number
    let b: number

    if (huePrime >= 0 && huePrime < 1) {
        r = chroma
        g = x
        b = 0
    } else if (huePrime >= 1 && huePrime < 2) {
        r = x
        g = chroma
        b = 0
    } else if (huePrime >= 2 && huePrime < 3) {
        r = 0
        g = chroma
        b = x
    } else if (huePrime >= 3 && huePrime < 4) {
        r = 0
        g = x
        b = chroma
    } else if (huePrime >= 4 && huePrime < 5) {
        r = x
        g = 0
        b = chroma
    } else {
        r = chroma
        g = 0
        b = x
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
        a: a ?? 1
    }
}

/**
 * 将颜色字符串转换为 RGBA 对象
 * @param color - 颜色字符串（支持十六进制、RGB、RGBA、HSL、HSLA 格式）
 * @returns 包含 r, g, b, a 属性的 RGBA 对象
 */
export function toRgba(color: string): RGBA {
    if (isHexColor(color)) {
        return hexToRgba(color)
    }

    if (color.startsWith('rgb')) {
        return rgbStringToRgba(color)
    }

    if (color.startsWith('hsl')) {
        return hslStringToRgba(color)
    }

    return {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    }
}
