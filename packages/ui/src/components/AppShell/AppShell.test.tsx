import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { AppShell } from './AppShell'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

/**
 * 根元素按断点下发的那段 CSS：尺寸对象走仓库既有的响应式通道
 * （parseStyleProps + InlineStyles + 随机类，与 Grid.Col 同源）。
 * 随机类名由 useId 决定，断言前统一替换成 .shell 以便可读。
 */
function getShellBreakpointCss(container: HTMLElement) {
    const shell = container.querySelector<HTMLElement>('[data-testid="shell"]')
    const generatedClass = shell?.className.match(/__m__-[\w-]+/)?.[0]
    const css = Array.from(container.querySelectorAll('style[data-ui-styles="inline"]'))
        .map(tag => tag.textContent ?? '')
        .join('')

    return {
        shell,
        /** 是否生成了断点用的随机类（非响应式用法必须为 false） */
        hasBreakpointClass: !!generatedClass,
        css: generatedClass ? css.replace(new RegExp(`\\.${generatedClass}`, 'g'), '.shell') : css
    }
}

describe('AppShell', () => {
    it('renders root and subcomponents', () => {
        renderWithProvider(
            <AppShell data-testid="shell" header={{ height: 60 }} navbar={{ width: 200 }}>
                <AppShell.Header data-testid="header">Header</AppShell.Header>
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Main data-testid="main">Main</AppShell.Main>
            </AppShell>
        )

        expect(screen.getByTestId('shell')).toBeInTheDocument()
        expect(screen.getByTestId('header')).toHaveTextContent('Header')
        expect(screen.getByTestId('navbar')).toHaveTextContent('Navbar')
        expect(screen.getByTestId('main')).toHaveTextContent('Main')
    })

    it('renders aside and footer', () => {
        renderWithProvider(
            <AppShell data-testid="shell" aside={{ width: 180 }} footer={{ height: 40 }}>
                <AppShell.Aside data-testid="aside">Aside</AppShell.Aside>
                <AppShell.Main>Main</AppShell.Main>
                <AppShell.Footer data-testid="footer">Footer</AppShell.Footer>
            </AppShell>
        )

        expect(screen.getByTestId('aside')).toHaveTextContent('Aside')
        expect(screen.getByTestId('footer')).toHaveTextContent('Footer')
    })

    it('marks navbar as collapsed', () => {
        renderWithProvider(
            <AppShell navbar={{ width: 200, collapsed: true }}>
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        expect(screen.getByTestId('navbar')).toHaveAttribute('data-collapsed')
    })

    it('keeps plain number sizes untouched (inline vars, no breakpoint class)', () => {
        const { container } = renderWithProvider(
            <AppShell
                data-testid="shell"
                header={{ height: 60 }}
                footer={{ height: 40 }}
                navbar={{ width: 200 }}
                aside={{ width: 180 }}
            >
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        const { shell, css, hasBreakpointClass } = getShellBreakpointCss(container)

        // 变量名、顺序与 rem 换算都是改动前的输出（无单位值会让 grid-template 整条声明失效）
        expect(shell?.getAttribute('style')).toBe(
            '--app-shell-padding: var(--ui-spacing-md); ' +
                '--app-shell-header-height: calc(3.75rem * var(--ui-scale)); ' +
                '--app-shell-footer-height: calc(2.5rem * var(--ui-scale)); ' +
                '--app-shell-navbar-width: calc(12.5rem * var(--ui-scale)); ' +
                '--app-shell-aside-width: calc(11.25rem * var(--ui-scale));'
        )
        // 类表也保持「模块类 + 静态类」两项，不追加随机类
        expect(shell?.className).toMatch(/^_root_[0-9a-f]+ ui-AppShell-root$/)
        expect(hasBreakpointClass).toBe(false)
        expect(css).toBe('')
        expect(container.querySelectorAll('style[data-ui-styles="inline"]')).toHaveLength(0)
    })

    it('resolves responsive sizes into per breakpoint rules instead of [object Object]', () => {
        const { container } = renderWithProvider(
            <AppShell
                data-testid="shell"
                header={{ height: { base: 60, md: 70, lg: 80 } }}
                navbar={{ width: { base: 200, md: 300, lg: 400 } }}
            >
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        expect(container.innerHTML).not.toContain('[object Object]')

        const { shell, css, hasBreakpointClass } = getShellBreakpointCss(container)
        expect(hasBreakpointClass).toBe(true)
        expect(css).toContain(
            '.shell{--app-shell-header-height:calc(3.75rem * var(--ui-scale));' +
                '--app-shell-navbar-width:calc(12.5rem * var(--ui-scale));}'
        )
        expect(css).toContain(
            '@media(min-width: 62em){.shell{--app-shell-header-height:calc(4.375rem * var(--ui-scale));' +
                '--app-shell-navbar-width:calc(18.75rem * var(--ui-scale));}}'
        )
        expect(css).toContain(
            '@media(min-width: 75em){.shell{--app-shell-header-height:calc(5rem * var(--ui-scale));' +
                '--app-shell-navbar-width:calc(25rem * var(--ui-scale));}}'
        )
        // base 值不能再留在内联变量里：内联优先级会压掉上面所有媒体查询
        expect(shell?.getAttribute('style')).toBe('--app-shell-padding: var(--ui-spacing-md);')
    })

    it('degrades a responsive object whose breakpoints collapse to one value', () => {
        const { container } = renderWithProvider(
            <AppShell data-testid="shell" navbar={{ width: { base: 200, md: 200 } }}>
                <AppShell.Navbar>Navbar</AppShell.Navbar>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        const { shell, css, hasBreakpointClass } = getShellBreakpointCss(container)
        expect(hasBreakpointClass).toBe(false)
        expect(css).toBe('')
        expect(shell?.getAttribute('style')).toBe(
            '--app-shell-padding: var(--ui-spacing-md); --app-shell-navbar-width: calc(12.5rem * var(--ui-scale));'
        )
    })

    it('drops breakpoint keys the theme does not define', () => {
        const { container } = renderWithProvider(
            <AppShell data-testid="shell" navbar={{ width: { xxxl: 300 } }}>
                <AppShell.Navbar>Navbar</AppShell.Navbar>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        const { shell, css, hasBreakpointClass } = getShellBreakpointCss(container)
        expect(container.innerHTML).not.toContain('[object Object]')
        expect(hasBreakpointClass).toBe(false)
        expect(css).toBe('')
        // 与「未配置 width」一致：轨道尺寸由 AppShell.module.css 里 var() 的 0px 兜底
        expect(shell?.getAttribute('style')).toBe('--app-shell-padding: var(--ui-spacing-md);')
    })

    it('keeps a collapsed section collapsed across every breakpoint of a responsive width', () => {
        const { container } = renderWithProvider(
            <AppShell data-testid="shell" navbar={{ width: { base: 200, lg: 400 }, collapsed: true }}>
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        const { shell, css, hasBreakpointClass } = getShellBreakpointCss(container)

        // 各断点算下来同为 0px：退回内联变量，既没有媒体查询也就没有任何视口能复活 200/400
        // （只查 shell 子树：UIProvider 那段主题变量 style 里的 1.25rem 之类会干扰字符串断言）
        expect(css).toBe('')
        expect(hasBreakpointClass).toBe(false)
        expect(shell?.outerHTML).not.toContain('12.5rem')
        expect(shell?.outerHTML).not.toContain('25rem')
        expect(shell?.getAttribute('style')).toBe(
            '--app-shell-padding: var(--ui-spacing-md); --app-shell-navbar-width: 0px;'
        )
        expect(screen.getByTestId('navbar')).toHaveAttribute('data-collapsed')
    })

    it('expands a section that is collapsed at base but revoked at a wider breakpoint', () => {
        const { container } = renderWithProvider(
            <AppShell
                data-testid="shell"
                navbar={{ width: { base: 200, lg: 400 }, collapsed: { base: true, lg: false } }}
                aside={{ width: 180, collapsed: { lg: true } }}
            >
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Aside data-testid="aside">Aside</AppShell.Aside>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        const { css } = getShellBreakpointCss(container)

        // navbar：base 折叠必须落 0px，lg 展开必须回到该断点声明的 400（不能残留 base 的 0px）
        expect(css).toContain('.shell{--app-shell-navbar-width:0px;--app-shell-aside-width:calc(11.25rem * var(--ui-scale));}')
        expect(css).toContain(
            '@media(min-width: 75em){.shell{--app-shell-navbar-width:calc(25rem * var(--ui-scale));' +
                '--app-shell-aside-width:0px;}}'
        )
        // md 未在 collapsed 上声明：继承 base 的 true，所以 base 的 200 不会在任何视口漏出来
        expect(css).not.toContain('--app-shell-navbar-width:calc(12.5rem')
        // 只在部分断点折叠：属性无法表达逐断点折叠，交给变量，故不写 data-collapsed
        expect(screen.getByTestId('navbar')).not.toHaveAttribute('data-collapsed')
        expect(screen.getByTestId('aside')).not.toHaveAttribute('data-collapsed')
    })

    it('fixed 布局标记 data-fixed，并把 body 滚动锁在挂载期内', () => {
        document.body.style.overflow = 'auto'

        const { unmount } = renderWithProvider(
            <AppShell data-testid="shell" fixed>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        expect(screen.getByTestId('shell')).toHaveAttribute('data-fixed')
        expect(document.body.style.overflow).toBe('hidden')

        unmount()
        // 还原的是进入前的值，不是硬编码 ''：嵌套/并列的 AppShell 才不会互相踩锁
        expect(document.body.style.overflow).toBe('auto')

        renderWithProvider(
            <AppShell data-testid="plain">
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )
        expect(screen.getByTestId('plain')).not.toHaveAttribute('data-fixed')
        expect(document.body.style.overflow).toBe('auto')
    })
})
