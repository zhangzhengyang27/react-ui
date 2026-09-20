import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell, Button, UIProvider } from '@xiaoye-react/ui'

/**
 * AppShell fixed 布局的真机 fixture（独立页面，避免锁 body 影响其它 fixtures）：
 * 根元素必须正好铺满视口、只有 main 内部滚动、卸载后 body 滚动锁要还原。
 */
function FixedShellFixture() {
    const [mounted, setMounted] = useState(true)

    // 切换按钮放在 shell 内部：fixed 的 AppShell 覆盖整个视口，外面的元素会被它挡住点不到
    const toggle = (
        <Button data-testid="toggle" onClick={() => setMounted(prev => !prev)}>
            toggle
        </Button>
    )

    if (!mounted) {
        return <div>{toggle}</div>
    }

    return (
        <AppShell
            data-testid="shell"
            header={{ height: 60 }}
            navbar={{ width: 220 }}
            footer={{ height: 40 }}
            fixed
        >
            <AppShell.Header data-testid="header">
                顶部固定 {toggle}
            </AppShell.Header>
            <AppShell.Navbar data-testid="navbar">左侧固定</AppShell.Navbar>
            <AppShell.Main data-testid="main">
                <div style={{ height: 4000 }}>很长的内容</div>
            </AppShell.Main>
            <AppShell.Footer data-testid="footer">底部固定</AppShell.Footer>
        </AppShell>
    )
}

createRoot(document.getElementById('root')!).render(
    <UIProvider>
        <FixedShellFixture />
    </UIProvider>
)
