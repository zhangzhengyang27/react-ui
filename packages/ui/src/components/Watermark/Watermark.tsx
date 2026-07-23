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

function buildSvgDataUrl(
    content: string[],
    rotate: number,
    fontSize: number,
    color: string,
    gap: [number, number]
) {
    const lineHeight = fontSize * 1.4
    const textHeight = content.length * lineHeight
    const width = gap[0]
    const height = gap[1] + textHeight

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
    }, [contentArray, rotate, finalFontSize, finalColor, gap])

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
