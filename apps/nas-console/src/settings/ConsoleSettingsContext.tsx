import { useLocalStorage } from '@xiaoye-react/hooks'
import { createContext, useContext, useMemo, type ReactNode } from 'react'

export interface ConsoleSettings {
    /** 主题偏好：浅色 / 深色 / 跟随系统 */
    theme: 'light' | 'dark' | 'auto'
    /** 健康检查轮询间隔（秒） */
    healthIntervalSec: number
    /** Umami 部署地址 */
    umamiUrl: string
    /** Umami 账号（仅存浏览器 localStorage，不上传） */
    umamiUsername: string
    umamiPassword: string
    /** 总览页默认展示的站点 */
    dashboardSiteId: string
}

export const DEFAULT_SETTINGS: ConsoleSettings = {
    theme: 'auto',
    healthIntervalSec: 60,
    umamiUrl: 'https://analytics.zhangzhengyang.com',
    umamiUsername: '',
    umamiPassword: '',
    dashboardSiteId: ''
}

interface SettingsContextValue {
    settings: ConsoleSettings
    update: (patch: Partial<ConsoleSettings>) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

const STORAGE_KEY = 'nas-console-settings'

export function ConsoleSettingsProvider({ children }: { children: ReactNode }) {
    const [stored, setStored] = useLocalStorage<ConsoleSettings>({
        key: STORAGE_KEY,
        defaultValue: DEFAULT_SETTINGS
    })

    const value = useMemo<SettingsContextValue>(
        () => ({
            settings: { ...DEFAULT_SETTINGS, ...stored },
            update: (patch) =>
                setStored((prev) => ({
                    ...DEFAULT_SETTINGS,
                    ...(typeof prev === 'object' ? prev : DEFAULT_SETTINGS),
                    ...patch
                }))
        }),
        [stored, setStored]
    )

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useConsoleSettings() {
    const ctx = useContext(SettingsContext)
    if (!ctx) {
        throw new Error('useConsoleSettings 必须在 ConsoleSettingsProvider 内使用')
    }
    return ctx
}
