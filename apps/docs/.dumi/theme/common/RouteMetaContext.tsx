import React from 'react'
import { useRouteMeta } from 'dumi'

type RouteMeta = ReturnType<typeof useRouteMeta>

const RouteMetaContext = React.createContext<RouteMeta>(null!)

/**
 * 全站 useRouteMeta 共享 Provider（切页卡顿治理 · 修复 4）：
 * useRouteMeta 每次调用都会在路由表上做 matchRoutes，此前 CommonHelmet /
 * Content / DocAnchor / DocMeta / ResourceLayout 各自调用，同一页面要重复
 * 扫表 5 次。现在由 DocLayout 计算一次，消费方通过 Context 读取。
 *
 * dumi 的 getCachedRouteMeta 按 route.id 缓存 meta 对象，跨渲染引用稳定，
 * 因此 Context value 在同一路由下不会触发多余的重渲染。
 */
export const RouteMetaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const meta = useRouteMeta()
    return <RouteMetaContext.Provider value={meta}>{children}</RouteMetaContext.Provider>
}

export const useSharedRouteMeta = () => React.use(RouteMetaContext)
