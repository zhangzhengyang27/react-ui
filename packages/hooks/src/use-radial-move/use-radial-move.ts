import { useCallback, useEffect, useRef, useState } from 'react'
import { clamp } from '../utils'

function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI)
}

function getElementCenter(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return [rect.left + rect.width / 2, rect.top + rect.height / 2]
}

function getAngle(coordinates: [number, number], element: HTMLElement) {
  const center = getElementCenter(element)
  const x = coordinates[0] - center[0]
  const y = coordinates[1] - center[1]
  const deg = radiansToDegrees(Math.atan2(x, y)) + 180
  return 360 - deg
}

function toFixed(value: number, digits: number) {
  return parseFloat(value.toFixed(digits))
}

function getDigitsAfterDot(value: number) {
  return value.toString().split('.')[1]?.length || 0
}

export function normalizeRadialValue(degree: number, step: number) {
  const clamped = clamp(degree, 0, 360)
  const high = Math.ceil(clamped / step)
  const low = Math.round(clamped / step)
  // ceil(x) >= x 恒真:原实现「high >= clamped/step」判定使 low*step 成为死分支,
  // step 不整除 360 时 ceil 网格会越界(如 step=7、拖到 358° 得 52*7=364),aria-valuenow 超过 max
  const highValue = high * step === 360 ? 0 : high * step
  // 越界回落 round 网格值(Math.min 兜住浮点乘积略超 360 的边角),360 回绕为 0 保持值域 [0, 360)
  const raw = highValue > 360 ? Math.min(low * step, 360) : highValue
  return toFixed(raw === 360 ? 0 : raw, getDigitsAfterDot(step))
}

export interface UseRadialMoveOptions {
  step?: number
  onChangeEnd?: (value: number) => void
  onScrubStart?: () => void
  onScrubEnd?: () => void
}

export interface UseRadialMoveReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>
  active: boolean
}

export function useRadialMove<T extends HTMLElement = any>(
  onChange: (value: number) => void,
  { step = 0.01, onChangeEnd, onScrubStart, onScrubEnd }: UseRadialMoveOptions = {}
): UseRadialMoveReturnValue<T> {
  const [active, setActive] = useState(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  // 用 ref 跟踪回调与 options,保持 refCallback 稳定,避免内联回调导致 ref 频繁重绑
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const onChangeEndRef = useRef(onChangeEnd)
  onChangeEndRef.current = onChangeEnd
  const onScrubStartRef = useRef(onScrubStart)
  onScrubStartRef.current = onScrubStart
  const onScrubEndRef = useRef(onScrubEnd)
  onScrubEndRef.current = onScrubEnd
  const stepRef = useRef(step)
  stepRef.current = step

  useEffect(() => {
    return () => {
      cleanupRef.current?.()
    }
  }, [])

  const refCallback: React.RefCallback<T | null> = useCallback(
    (node) => {
      const update = (point: { clientX: number; clientY: number }, done = false) => {
        if (node) {
          const deg = getAngle([point.clientX, point.clientY], node)
          const newValue = normalizeRadialValue(deg, stepRef.current || 1)
          onChangeRef.current(newValue)
          done && onChangeEndRef.current?.(newValue)
        }
      }

      const beginTracking = () => {
        onScrubStartRef.current?.()
        setActive(true)
        if (node) {
          node.style.userSelect = 'none'
        }
        document.addEventListener('mousemove', handleMouseMove, false)
        document.addEventListener('mouseup', handleMouseUp, false)
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd, false)
        // 触摸拖拽被系统中断（来电、系统手势接管）派发的是 touchcancel 而非 touchend，
        // 不监听会残留 active/document 监听与 user-select:none；endTracking 幂等，直接复用
        document.addEventListener('touchcancel', endTracking, false)
        document.addEventListener('pointercancel', endTracking, false)
      }

      const endTracking = () => {
        onScrubEndRef.current?.()
        setActive(false)
        if (node) {
          node.style.userSelect = ''
        }
        document.removeEventListener('mousemove', handleMouseMove, false)
        document.removeEventListener('mouseup', handleMouseUp, false)
        document.removeEventListener('touchmove', handleTouchMove, false)
        document.removeEventListener('touchend', handleTouchEnd, false)
        document.removeEventListener('touchcancel', endTracking, false)
        document.removeEventListener('pointercancel', endTracking, false)
      }

      const onMouseDown = (event: MouseEvent) => {
        beginTracking()
        update(event)
      }

      const handleMouseMove = (event: MouseEvent) => {
        update(event)
      }

      const handleMouseUp = (event: MouseEvent) => {
        update(event, true)
        endTracking()
      }

      const handleTouchMove = (event: TouchEvent) => {
        event.preventDefault()
        update(event.touches[0])
      }

      const handleTouchEnd = (event: TouchEvent) => {
        update(event.changedTouches[0], true)
        endTracking()
      }

      const handleTouchStart = (event: TouchEvent) => {
        event.preventDefault()
        beginTracking()
        update(event.touches[0])
      }

      node?.addEventListener('mousedown', onMouseDown)
      node?.addEventListener('touchstart', handleTouchStart, { passive: false })

      cleanupRef.current = () => {
        document.removeEventListener('mousemove', handleMouseMove, false)
        document.removeEventListener('mouseup', handleMouseUp, false)
        document.removeEventListener('touchmove', handleTouchMove, false)
        document.removeEventListener('touchend', handleTouchEnd, false)
        document.removeEventListener('touchcancel', endTracking, false)
        document.removeEventListener('pointercancel', endTracking, false)
      }

      return () => {
        if (node) {
          node.removeEventListener('mousedown', onMouseDown)
          node.removeEventListener('touchstart', handleTouchStart)
        }
      }
    },
    // step 仅影响 normalizeRadialValue 的离散化粒度,已通过 stepRef 跟踪;
    // 这里保留空依赖以稳定 refCallback,与 use-move 模式一致
    []
  )

  return { ref: refCallback, active }
}

export namespace useRadialMove {
  export type Options = UseRadialMoveOptions
  export type ReturnValue<T extends HTMLElement> = UseRadialMoveReturnValue<T>
}
