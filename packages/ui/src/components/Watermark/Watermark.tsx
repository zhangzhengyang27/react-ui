import React, { useMemo } from 'react'
import {
    Box,
    BoxProps,
    factory,
    Factory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Watermark.module.css'

export type WatermarkStylesNames = 'root' | 'marker'

export interface WatermarkFont {
    color?: string
    fontSize?: number
}

export interface WatermarkProps extends BoxProps, StylesApiProps<WatermarkFactory> {
    /** 水印文字内容，支持单行或多行 */
    content?: string | string[]

    /** 水印层级 @default 9 */
    zIndex?: number

    /** 水印旋转角度 @default -22 */
    rotate?: number

    /** 水印文字大小 @default 14 */
    fontSize?: number

    /** 水印文字颜色 @default rgba(0, 0, 0, 0.12) */
    color?: string

    /** 字体配置（优先级高于 fontSize/color） */
    font?: WatermarkFont

    /** 水印间距 @default [120, 60] */
    gap?: [number, number]

    /** 水印起始偏移 @default [0, 0] */
    offset?: [number, number]

    /** 子元素 */
    children?: React.ReactNode
}

export type WatermarkFactory = Factory<{
    props: WatermarkProps
    ref: HTMLDivElement
    stylesNames: WatermarkStylesNames
}>

const defaultProps = {
    zIndex: 9,
    rotate: -22,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.12)',
    gap: [120, 60] as [number, number],
    offset: [0, 0] as [number, number]
} satisfies Partial<WatermarkProps>

function measureTextWidth(lines: string[], fontSize: number): number {
    // canvas 不可用（SSR/测试）时用 0.6em/字符 粗估，仅影响瓦片密度不影响正确性
    if (typeof document === 'undefined') {
        const longest = lines.reduce((max, line) => Math.max(max, line.length), 0)
        return longest * fontSize * 0.6
    }
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        const longest = lines.reduce((max, line) => Math.max(max, line.length), 0)
        return longest * fontSize * 0.6
    }
    ctx.font = `${fontSize}px sans-serif`
    return lines.reduce((max, line) => Math.max(max, ctx.measureText(line).width), 0)
}

function buildSvgDataUrl(
    content: string[],
    rotate: number,
    fontSize: number,
    color: string,
    gap: [number, number]
) {
    const lineHeight = fontSize * 1.4
    const textHeight = content.length * lineHeight
    // 瓦片宽度按最长文本实测（此前固定为 gap[0]，长文本被 SVG 按 viewBox 裁切，
    // 平铺出残缺水印）；宽度/高度取文本经旋转后的水平/垂直投影并留出间隙
    const textWidth = measureTextWidth(content, fontSize)
    const radian = (rotate * Math.PI) / 180
    const cos = Math.abs(Math.cos(radian))
    const sin = Math.abs(Math.sin(radian))
    const width = Math.ceil(textWidth * cos + textHeight * sin) + gap[0]
    const height = Math.ceil(textWidth * sin + textHeight * cos) + gap[1]

    const textElements = content
        .map((line, index) => {
            const y = height / 2 + (index - (content.length - 1) / 2) * lineHeight
            return `<text x="50%" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="${fontSize}" fill="${color}" transform="rotate(${rotate}, ${width / 2}, ${height / 2})">${escapeXml(line)}</text>`
        })
        .join('')

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${textElements}</svg>`
    return `url("data:image/svg+xml,${encodeSvg(svg)}")`
}

function encodeSvg(svg: string) {
    return svg
        .replace(/"/g, "'")
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
}

function escapeXml(text: string) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export const Watermark = factory<WatermarkFactory>((_props, ref) => {
    const props = useProps('Watermark', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        content,
        zIndex,
        rotate,
        fontSize,
        color,
        font,
        gap,
        offset,
        children,
        mod,
        ...others
    } = props

    const getStyles = useStyles<WatermarkFactory>({
        name: 'Watermark',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars
    })

    const finalFontSize = font?.fontSize ?? fontSize!
    const finalColor = font?.color ?? color!

    const contentArray = useMemo(() => {
        if (!content) return []
        return Array.isArray(content) ? content : [content]
    }, [content])

    const backgroundImage = useMemo(() => {
        if (contentArray.length === 0) return undefined
        return buildSvgDataUrl(contentArray, rotate!, finalFontSize, finalColor, gap!)
        // 依赖取原始值：内联 gap={[120, 60]} 的新数组身份不至于每次渲染重建 data URL
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentArray, rotate, finalFontSize, finalColor, gap?.[0], gap?.[1]])

    const backgroundPosition = useMemo(() => {
        if (!offset) return undefined
        return `${offset[0]}px ${offset[1]}px`
    }, [offset])

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            {children}
            {contentArray.length > 0 && (
                <Box
                    component="div"
                    aria-hidden="true"
                    {...getStyles('marker')}
                    style={{
                        ...getStyles('marker').style,
                        zIndex,
                        backgroundImage,
                        backgroundPosition
                    }}
                />
            )}
        </Box>
    )
})

Watermark.classes = classes
Watermark.displayName = '@xiaoye-react/ui/Watermark'

export namespace Watermark {
    export type Props = WatermarkProps
    export type Factory = WatermarkFactory
    export type StylesNames = WatermarkStylesNames
}
