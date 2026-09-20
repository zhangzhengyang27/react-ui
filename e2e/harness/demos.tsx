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
    kind: 'render-throw' | 'console.error' | 'console.warn' | 'uncaught' | 'dom-attr-leak' | 'prop-not-consumed'
    text: string
    /** 同一 demo 同一 kind 下的区分位（例如泄漏的 prop 名），没有则按 kind 折叠成一条 */
    subject?: string
}

export interface DemoSweepState {
    done: boolean
    mounted: number
    total: number
    issues: DemoSweepIssue[]
}

interface DemoEntry {
    id: string
    Component: (props: Record<string, unknown>) => JSX.Element
    props: Record<string, unknown>
}

interface DemoControl {
    prop?: string
    initialValue?: unknown
}

interface DemoModule {
    component?: (props: Record<string, unknown>) => JSX.Element
    controls?: DemoControl[]
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
            const demo = value as DemoModule | null
            if (typeof demo?.component !== 'function') {
                continue
            }
            // configurator 类 demo 的组件按 controls 的 initialValue 渲染，页面上从不
            // 空 props 挂载；不给初始 props 就等于在测一个现实中不存在的状态
            // （例如 theme 配置 demo 直接读 props.color 会抛 undefined）。
            const props: Record<string, unknown> = {}
            for (const control of demo.controls ?? []) {
                if (typeof control?.prop === 'string') {
                    props[control.prop] = control.initialValue
                }
            }
            entries.push({ id: `${path}#${exportName}`, Component: demo.component, props })
        }
    }
    return entries.sort((a, b) => a.id.localeCompare(b.id))
}

const demos = collectDemos()

window.__DEMO_SWEEP = { done: false, mounted: 0, total: demos.length, issues: [] }

// 全局按 属性名@标签 去重：报告的是"库里有哪些泄漏点"，而不是每个 demo 重复计数
const seenAttrs = new Set<string>()

let currentDemo = 'unknown'

function record(kind: DemoSweepIssue['kind'], args: unknown[], subject?: string) {
    const text = args
        .map(arg => (typeof arg === 'string' ? arg : String((arg as Error)?.message ?? arg)))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
    window.__DEMO_SWEEP.issues.push({ demo: currentDemo, kind, subject, text: text.slice(0, 400) })
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
 * 传入的 prop 被原样写成 DOM 属性 ⇒ 组件根本没消费它。
 *
 * 为什么必须单独查：React 19 对未知属性不再告警（只有少数类型不符才提示），
 * demo 又是 `function Wrapper(props: any)` + {...props}，tsc 也看不见——
 * 三层全是盲区，只有对比 DOM 属性表能抓到（今天清掉的 tabularNums /
 * withThumbIndicator / alignItemsLabels / labelPosition 都是这一类）。
 *
 * 判据用「是不是真实 DOM 属性」而不是大小写：tabIndex/colSpan/htmlFor 这类
 * 合法驼峰 prop 本就该映射成小写属性，用原型链属性名集合排除，避免手写白名单腐坏。
 * 集合取自 window 上全部 HTML*Element 原型：手写 17 个会漏掉 HTMLTableCellElement
 * 这类，导致 colSpan 之类的合法 prop 被误报。
 */
const DOM_PROPS = new Set<string>()
for (const proto of [Element.prototype, HTMLElement.prototype]) {
    for (const name of Object.getOwnPropertyNames(proto)) DOM_PROPS.add(name)
}
for (const key of Object.getOwnPropertyNames(window)) {
    if (!/^HTML\w+Element$/.test(key)) {
        continue
    }
    const ctor = (window as any)[key]
    if (typeof ctor !== 'function' || typeof ctor.prototype !== 'object' || ctor.prototype === null) {
        continue
    }
    for (const name of Object.getOwnPropertyNames(ctor.prototype)) DOM_PROPS.add(name)
}

function scanPropDump(root: HTMLElement, props: Record<string, unknown>, seen: Set<string>) {
    for (const name of Object.keys(props)) {
        if (DOM_PROPS.has(name) || name === 'children' || name === 'key' || name === 'ref') {
            continue
        }
        const lowered = name.toLowerCase()
        if (lowered.startsWith('data-') || lowered.startsWith('aria-')) {
            continue
        }
        const hit = Array.from(root.querySelectorAll(`[${lowered}]`)).find(
            el => !(el instanceof SVGElement || el instanceof MathMLElement)
        )
        if (!hit) {
            continue
        }
        const key = `${lowered}@${hit.tagName.toLowerCase()}`
        if (seen.has(key)) {
            continue
        }
        seen.add(key)
        record(
            'prop-not-consumed',
            [`demo 传入的 prop ${name} 被原样写成 <${hit.tagName.toLowerCase()}> 的属性 [${lowered}]，说明组件没有消费它`],
            key
        )
    }
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
            ], key)
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
                            <demo.Component {...demo.props} />
                        </Boundary>
                    </UIProvider>
                )
                // 让 effect、transition 与异步 setState 跑完再切下一个，报错才能归属到当前 demo
                await new Promise(resolve => setTimeout(resolve, 30))
                if (slot.current) {
                    scanDomLeaks(slot.current, seenAttrs)
                    // 每个 demo 单独去重：这里报的是"哪个 demo 传的哪个 prop 没被消费"，
                    // 全局去重会让同名 prop 在第二个组件上的泄漏隐身。
                    scanPropDump(slot.current, demo.props, new Set<string>())
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
