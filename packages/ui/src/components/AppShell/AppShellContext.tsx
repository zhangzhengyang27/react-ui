import { createContext, useContext } from 'react'
import { UISpacing } from '../../core'

export interface AppShellContextValue {
    padding?: UISpacing
    /** 以下尺寸为 base 槽位的生效值（字符串，数字已换算为 rem）：响应式写法下其余断点的
     *  尺寸由根元素上的 --app-shell-* 变量按媒体查询下发，JS 侧只拿得到 base */
    headerHeight?: React.CSSProperties['height']
    footerHeight?: React.CSSProperties['height']
    navbarWidth?: React.CSSProperties['width']
    asideWidth?: React.CSSProperties['width']
    /** 折叠状态：仅当 collapsed 在全部断点都为 true 时为 true，
     *  按断点折叠（如 `{ base: true, lg: false }`）时轨道宽度仍由变量逐断点决定 */
    navbarCollapsed?: boolean
    asideCollapsed?: boolean
}

export const AppShellContext = createContext<AppShellContextValue>({})

export function useAppShellContext() {
    return useContext(AppShellContext)
}
