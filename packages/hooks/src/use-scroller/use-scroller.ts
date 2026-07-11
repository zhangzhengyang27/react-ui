import { RefCallback, useCallback, useEffect, useRef, useState } from 'react'

export interface UseScrollerOptions {
  scrollAmount?: number
  draggable?: boolean
  onScrollStateChange?: (state: UseScrollerScrollState) => void
}

export interface UseScrollerScrollState {
  canScrollStart: boolean
  canScrollEnd: boolean
}

export interface UseScrollerReturnValue<T extends HTMLElement = HTMLDivElement> {
  ref: RefCallback<T | null>
  canScrollStart: boolean
  canScrollEnd: boolean
  scrollStart: () => void
  scrollEnd: () => void
  isDragging: boolean
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void
    onMouseMove: (e: React.MouseEvent) => void
    onMouseUp: () => void
    onMouseLeave: () => void
  }
}

export function useScroller<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollerOptions = {}
): UseScrollerReturnValue<T> {
  const { scrollAmount = 200, draggable = true, onScrollStateChange } = options

  const containerRef = useRef<T | null>(null)

  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const isDraggingRef = useRef(false)
  const hasDraggedRef = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  const onScrollStateChangeRef = useRef(onScrollStateChange)
  onScrollStateChangeRef.current = onScrollStateChange

  const updateScrollState = useCallback(() => {
    const container = containerRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const isRtl = getComputedStyle(container).direction === 'rtl'

      let newCanScrollStart: boolean
      let newCanScrollEnd: boolean

      if (isRtl) {
        newCanScrollStart = scrollLeft < -1
        newCanScrollEnd = scrollLeft > -(scrollWidth - clientWidth) + 1
      } else {
        newCanScrollStart = scrollLeft > 1
        newCanScrollEnd = scrollLeft < scrollWidth - clientWidth - 1
      }

      setCanScrollStart(newCanScrollStart)
      setCanScrollEnd(newCanScrollEnd)

      onScrollStateChangeRef.current?.({
        canScrollStart: newCanScrollStart,
        canScrollEnd: newCanScrollEnd,
      })
    }
  }, [])

  useEffect(() => {
    updateScrollState()
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollState)
      const resizeObserver = new ResizeObserver(updateScrollState)
      resizeObserver.observe(container)
      return () => {
        container.removeEventListener('scroll', updateScrollState)
        resizeObserver.disconnect()
      }
    }
    return undefined
  }, [updateScrollState])

  const scroll = useCallback(
    (direction: 'start' | 'end') => {
      const container = containerRef.current
      if (container) {
        const isRtl = getComputedStyle(container).direction === 'rtl'
        const amount = scrollAmount
        const scrollBy = direction === 'end' ? amount : -amount
        const adjustedScrollBy = isRtl ? -scrollBy : scrollBy

        container.scrollBy({
          left: adjustedScrollBy,
          behavior: 'smooth',
        })
      }
    },
    [scrollAmount]
  )

  const scrollStart = useCallback(() => scroll('start'), [scroll])
  const scrollEnd = useCallback(() => scroll('end'), [scroll])

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!draggable) {
        return
      }
      const container = containerRef.current
      if (container) {
        isDraggingRef.current = true
        hasDraggedRef.current = false
        setIsDragging(true)
        startX.current = event.pageX
        scrollLeftStart.current = container.scrollLeft
        container.style.cursor = 'grabbing'
        container.style.userSelect = 'none'
      }
    },
    [draggable]
  )

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!isDraggingRef.current) {
      return
    }
    event.preventDefault()
    const container = containerRef.current
    if (container) {
      const walk = event.pageX - startX.current
      if (Math.abs(walk) > 5) {
        hasDraggedRef.current = true
      }
      container.scrollLeft = scrollLeftStart.current - walk
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    const wasDragged = hasDraggedRef.current
    isDraggingRef.current = false
    hasDraggedRef.current = false
    setIsDragging(false)
    const container = containerRef.current
    if (container) {
      container.style.cursor = ''
      container.style.userSelect = ''

      if (wasDragged) {
        const suppressClick = (event: MouseEvent) => {
          event.stopPropagation()
          event.preventDefault()
          container.removeEventListener('click', suppressClick, true)
        }
        container.addEventListener('click', suppressClick, true)
      }
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      handleMouseUp()
    }
  }, [handleMouseUp])

  const assignRef: RefCallback<T | null> = useCallback(
    (node) => {
      containerRef.current = node
      if (node) {
        updateScrollState()
      }
    },
    [updateScrollState]
  )

  return {
    ref: assignRef,
    canScrollStart,
    canScrollEnd,
    scrollStart,
    scrollEnd,
    isDragging,
    dragHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
  }
}

export namespace useScroller {
  export type Options = UseScrollerOptions
  export type ReturnValue<T extends HTMLElement = HTMLDivElement> = UseScrollerReturnValue<T>
  export type ScrollState = UseScrollerScrollState
}
