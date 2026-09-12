import { useColorScheme } from '@xiaoye-react/hooks'
import { Notifications } from '@xiaoye-react/notifications'
import { ModalsProvider } from '@xiaoye-react/modals'
import { UIProvider } from '@xiaoye-react/ui'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { AppLayout } from './layouts/AppLayout'
import { AnalyticsPage } from './pages/Analytics'
import { DashboardPage } from './pages/Dashboard'
import { ServicesPage } from './pages/Services'
import { SettingsPage } from './pages/Settings'
import { ConsoleSettingsProvider, useConsoleSettings } from './settings/ConsoleSettingsContext'

/** 根据「主题偏好」解析出最终深浅色（auto → 跟随系统），再交给 UIProvider */
function ThemedApp({ children }: { children: React.ReactNode }) {
    const { settings } = useConsoleSettings()
    // useColorScheme 只依赖 matchMedia，可在 UIProvider 之外使用
    const osColorScheme = useColorScheme('light', { getInitialValueInEffect: false })
    const colorScheme = settings.theme === 'auto' ? osColorScheme : settings.theme

    // body 的背景/文字变量挂在 <html> 的 data-ui-color-scheme 上（UIProvider 只覆盖自身子树）；
    // index.html 里为防白闪写的 html 内联背景会阻断 body 背景向画布传播，这里同步接管
    useEffect(() => {
        document.documentElement.setAttribute('data-ui-color-scheme', colorScheme)
        document.documentElement.style.background = 'var(--ui-color-body)'
    }, [colorScheme])

    return (
        <UIProvider colorScheme={colorScheme}>
            <Notifications position="top-right" />
            <ModalsProvider labels={{ confirm: '确认', cancel: '取消' }}>{children}</ModalsProvider>
        </UIProvider>
    )
}

export function App() {
    return (
        <ConsoleSettingsProvider>
            <ThemedApp>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="analytics" element={<AnalyticsPage />} />
                            <Route path="services" element={<ServicesPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemedApp>
        </ConsoleSettingsProvider>
    )
}
