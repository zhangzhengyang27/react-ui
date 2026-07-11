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
  return toFixed(
    high >= clamped / step ? (high * step === 360 ? 0 : high * step) : low * step,
    getDigitsAfterDot(step)
  )
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
          const newValue = normalizeRadialValue(deg, step || 1)
          onChange(newValue)
          done && onChangeEnd?.(newValue)
        }
      }

      const beginTracking = () => {
        onScrubStart?.()
        setActive(true)
        if (node) {
          node.style.userSelect = 'none'
        }
        document.addEventListener('mousemove', handleMouseMove, false)
        document.addEventListener('mouseup', handleMouseUp, false)
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd, false)
      }

      const endTracking = () => {
        onScrubEnd?.()
        setActive(false)
        if (node) {
          node.style.userSelect = ''
        }
        document.removeEventListener('mousemove', handleMouseMove, false)
        document.removeEventListener('mouseup', handleMouseUp, false)
        document.removeEventListener('touchmove', handleTouchMove, false)
        document.removeEventListener('touchend', handleTouchEnd, false)
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
      }

      return () => {
        if (node) {
          node.removeEventListener('mousedown', onMouseDown)
          node.removeEventListener('touchstart', handleTouchStart)
        }
      }
    },
    [onChange, step, onChangeEnd, onScrubStart, onScrubEnd]
  )

  return { ref: refCallback, active }
}

export namespace useRadialMove {
  export type Options = UseRadialMoveOptions
  export type ReturnValue<T extends HTMLElement> = UseRadialMoveReturnValue<T>
}
