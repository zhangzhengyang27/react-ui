import { describe, expect, it } from 'vitest'
import { toRgba } from './to-rgba'

describe('@xiaoye-react/ui/toRgba', () => {
    it('保留 alpha=0（此前被当成 1）', () => {
        expect(toRgba('rgba(255, 0, 0, 0)').a).toBe(0)
        expect(toRgba('hsla(120, 100%, 50%, 0)').a).toBe(0)
        expect(toRgba('rgba(255, 0, 0, 0.5)').a).toBe(0.5)
        expect(toRgba('rgb(255, 0, 0)').a).toBe(1)
    })

    it('支持 4 位 #RGBA 十六进制', () => {
        expect(toRgba('#f00f')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(toRgba('#f000')).toEqual({ r: 255, g: 0, b: 0, a: 0 })
        expect(toRgba('#00ff00ff')).toEqual({ r: 0, g: 255, b: 0, a: 1 })
    })

    it('支持空格分隔的现代 rgb() 语法', () => {
        expect(toRgba('rgb(255 0 0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(toRgba('rgb(255 0 0 / 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
        expect(toRgba('rgb(255 0 0 / 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
        expect(toRgba('rgba(255, 0, 0, 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
    })

    it('支持空格分隔的现代 hsl() 语法', () => {
        expect(toRgba('hsl(120 100% 50%)')).toEqual({ r: 0, g: 255, b: 0, a: 1 })
        expect(toRgba('hsl(120 100% 50% / 0.5)')).toEqual({ r: 0, g: 255, b: 0, a: 0.5 })
        expect(toRgba('hsla(120, 100%, 50%, 0.5)')).toEqual({ r: 0, g: 255, b: 0, a: 0.5 })
    })
})
