import { Component, useEffect, useRef, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { UIProvider } from '@xiaoye-react/ui'

/**
 * 文档 demo 全量挂载页：把 apps/docs/demos 下每个 demo 的 component 逐个挂载一次，
 * 记录抛错与 console.error/warn。jsdom 测试与静态审查都抓不到「挂载即崩」和
 * 「组件自有 props 漏到 DOM 上」这两类问题，只能在真实浏览器里跑。
 * 消费方：e2e/interactions/docs-demos.spec.ts
 */
export interface DemoSweepIssue {
    demo: string
    kind: 'render-throw' | 'console.error' | 'console.warn' | 'uncaught' | 'dom-attr-leak'
    text: string
}

export interface DemoSweepState {
    done: boolean
    mounted: number
    total: number
    issues: DemoSweepIssue[]
}

interface DemoEntry {
    id: string
    Component: () => JSX.Element
}

declare global {
    interface Window {
        __DEMO_SWEEP: DemoSweepState
    }
}

const DEMO_FILES = import.meta.glob<{ default?: unknown; [name: string]: unknown }>(
    // story 文件不参与挂载：它们从旧包目录复制过来后 ../../render-demo 路径已失效
    ['../../apps/docs/demos/**/*.tsx', '!**/*.story.tsx', '!**/render-demo.tsx'],
    { eager: true }
)

function collectDemos(): DemoEntry[] {
    const entries: DemoEntry[] = []
    for (const [file, mod] of Object.entries(DEMO_FILES)) {
        const path = file.replace(/^.*\/demos\//, '').replace(/\.tsx$/, '')
        for (const [exportName, value] of Object.entries(mod)) {
            const component = (value as { component?: unknown } | null)?.component
            if (typeof component === 'function') {
                entries.push({ id: `${path}#${exportName}`, Component: component as () => JSX.Element })
            }
        }
    }
    return entries.sort((a, b) => a.id.localeCompare(b.id))
}

const demos = collectDemos()

window.__DEMO_SWEEP = { done: false, mounted: 0, total: demos.length, issues: [] }

// 全局按 属性名@标签 去重：报告的是"库里有哪些泄漏点"，而不是每个 demo 重复计数
const seenAttrs = new Set<string>()

let currentDemo = 'unknown'

function record(kind: DemoSweepIssue['kind'], args: unknown[]) {
    const text = args
        .map(arg => (typeof arg === 'string' ? arg : String((arg as Error)?.message ?? arg)))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
    window.__DEMO_SWEEP.issues.push({ demo: currentDemo, kind, text: text.slice(0, 400) })
}

function installCapture() {
    const originalError = console.error
    const originalWarn = console.warn
    console.error = (...args: unknown[]) => {
        record('console.error', args)
        originalError(...args)
    }
    console.warn = (...args: unknown[]) => {
        record('console.warn', args)
        originalWarn(...args)
    }
    window.addEventListener('error', event => record('uncaught', [event.message]))
    window.addEventListener('unhandledrejection', event => record('uncaught', [String(event.reason)]))
}

/**
 * 扫描 DOM 上值为 "[object Object]" 的属性：这类属性只可能是组件把自己的
 * 对象型 props（comboboxProps、classNames、highlight、filters 等）透传到了宿主元素。
 * 不能靠 React 告警发现——同一 (prop, tag) 只告警一次，修掉一批后其余的会一直隐身。
 * （属性名本身不可用：HTML DOM 会把未知属性名统一小写。）
 */
function scanDomLeaks(root: HTMLElement, seen: Set<string>) {
    for (const el of Array.from(root.querySelectorAll('*'))) {
        if (el instanceof SVGElement || el instanceof MathMLElement) {
            continue
        }
        for (const { name, value } of Array.from(el.attributes)) {
            if (name.startsWith('data-') || !/\[object Object\]/.test(value)) {
                continue
            }
            const key = `${name}@${el.tagName.toLowerCase()}`
            if (seen.has(key)) {
                continue
            }
            seen.add(key)
            record('dom-attr-leak', [
                `对象 prop 泄漏为属性 ${name}="…" 出现在 <${el.tagName.toLowerCase()}>，来源 demo 传了同名对象 prop`
            ])
        }
    }
}

class Boundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
    state = { failed: false }

    static getDerivedStateFromError() {
        return { failed: true }
    }

    componentDidCatch(error: Error) {
        record('render-throw', [error?.message ?? error])
    }

    render() {
        return this.state.failed ? null : this.props.children
    }
}

function Sweeper() {
    const slot = useRef<HTMLDivElement>(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        let cancelled = false
        let root: Root | null = null

        const run = async () => {
            for (let i = 0; i < demos.length; i++) {
                if (cancelled) {
                    return
                }
                const demo = demos[i]
                currentDemo = demo.id
                window.__DEMO_SWEEP.mounted = i
                if (!root && slot.current) {
                    root = createRoot(slot.current)
                }
                root?.render(
                    <UIProvider>
                        <Boundary>
                            <demo.Component />
                        </Boundary>
                    </UIProvider>
                )
                // 让 effect、transition 与异步 setState 跑完再切下一个，报错才能归属到当前 demo
                await new Promise(resolve => setTimeout(resolve, 30))
                if (slot.current) {
                    scanDomLeaks(slot.current, seenAttrs)
                }
                root?.render(null)
                await new Promise(resolve => setTimeout(resolve, 5))
            }
            if (cancelled) {
                return
            }
            window.__DEMO_SWEEP.mounted = demos.length
            window.__DEMO_SWEEP.done = true
            setReady(true)
        }

        installCapture()
        run()

        return () => {
            cancelled = true
        }
    }, [])

    return <div ref={slot} data-testid="demo-sweep" data-ready={ready} />
}

createRoot(document.getElementById('root')!).render(<Sweeper />)
