import { useEffect, useLayoutEffect } from 'react'

/**
 * 根据运行环境返回合适的 React effect Hook
 * @returns {function} 在浏览器环境中返回 useLayoutEffect，在服务器端渲染(SSR)环境中返回 useEffect
 */
export const useIsomorphicEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect
