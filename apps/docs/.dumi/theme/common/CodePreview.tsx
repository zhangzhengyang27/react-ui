import type { ComponentProps } from 'react'
import React, { useEffect, useMemo } from 'react'
import { AiOutlineCheck, AiOutlineCopy } from '../icons'
import { CopyButton, Tabs } from '@xiaoye-react/ui'
import { clsx } from 'clsx'
import toReactElement from 'jsonml-to-react-element'
import JsonML from 'jsonml.js/lib/utils'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

import DemoContext from '../slots/DemoContext'
import LiveCode from './LiveCode'
import styles from './CodePreview.module.css'
import type { CodeHighlightTabsCode } from '../builtins/Previewer/CodeExpandContext'

const LANGS = {
    tsx: 'TypeScript',
    jsx: 'JavaScript',
    style: 'CSS'
}

// DemoEngine 注册的多文件代码中，语言标识需要收敛为 LiveCode/Prism 支持的值
const normalizeFileLang = (lang?: string): 'tsx' | 'jsx' | 'style' => {
    const l = (lang ?? '').toLowerCase()
    if (l === 'scss' || l === 'css' || l === 'less' || l === 'style') return 'style'
    if (l === 'jsx' || l === 'js' || l === 'javascript') return 'jsx'
    return 'tsx'
}

interface CodePreviewProps extends Omit<ComponentProps<typeof LiveCode>, 'initialValue' | 'lang' | 'onChange'> {
    sourceCode?: string
    /** DemoEngine 注册的多文件代码（每个文件一个 Tab） */
    files?: CodeHighlightTabsCode[]
    jsxCode?: string
    styleCode?: string
    entryName: string
    onSourceChange?: (source: Record<string, string>) => void
}

const toReactComponent = (jsonML: any[]) => {
    return toReactElement(jsonML, [
        [
            (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
            (node: any, index: number) => {
                const attr = JsonML.getAttributes(node)
                return (
                    <pre key={index} className={`language-${attr.lang}`}>
                        <code dangerouslySetInnerHTML={{ __html: attr.highlighted }} />
                    </pre>
                )
            }
        ]
    ])
}

type CodeType = 'tsx' | 'jsx' | 'style'

type Codes = Partial<Record<CodeType, string>>

/**
 * 多文件代码：按文件分 Tab 展示（保留各自语言高亮），不再合并成一坨。
 * 独立成组件是为了让内部 useState 不影响 CodePreview 主体的 hooks 顺序
 * （files 数组形态若在 Configurator 等场景下发生变化，混合 hooks 会直接报错）。
 */
const FilesCodePreview: React.FC<
    Pick<CodePreviewProps, 'files' | 'entryName' | 'error' | 'onSourceChange'>
> = ({ files, entryName, error, onSourceChange }) => {
    const [fileTab, setFileTab] = React.useState(0)
    const activeIndex = Math.min(fileTab, files.length - 1)
    const activeFile = files[activeIndex]
    const activeLang = normalizeFileLang(activeFile?.language)
    const activeCode = activeFile?.code ?? ''
    return (
        <Tabs className="highlight" value={String(activeIndex)} onChange={v => setFileTab(Number(v))} keepMounted={false}>
            <Tabs.List position="center">
                {files.map((file, i) => (
                    <Tabs.Tab key={`${file.fileName}-${i}`} value={String(i)}>
                        {file.fileName || `File ${i + 1}`}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
            <Tabs.Panel key={activeIndex} value={String(activeIndex)}>
                <div className={styles.code}>
                    <LiveCode
                        key={activeIndex}
                        error={error}
                        lang={activeLang}
                        initialValue={activeCode}
                        onChange={(code: string) => {
                            // live 编辑的 source map 以 entry 文件名注册（约定第一个文件为入口），
                            // 其余文件用自身文件名，避免沙箱找不到入口代码
                            const sourceKey = activeIndex === 0 ? entryName : files[activeIndex]?.fileName || entryName
                            onSourceChange?.({ [sourceKey]: code })
                        }}
                    />
                    {/* button 嵌套 button 会导致水合失败，这里需要用 div 标签，不能用 button */}
                    <CopyButton value={activeCode}>
                        {({ copied, copy }) => (
                            <div
                                className={clsx(styles.copyButton, copied && styles.copyButtonSuccess)}
                                onClick={copy}
                                role="button"
                                aria-label="Copy code"
                            >
                                {copied ? <AiOutlineCheck /> : <AiOutlineCopy />}
                            </div>
                        )}
                    </CopyButton>
                </div>
            </Tabs.Panel>
        </Tabs>
    )
}

const CodePreview: React.FC<CodePreviewProps> = props => {
    const { sourceCode = '', files, jsxCode = '', styleCode = '', entryName, error, onSourceChange } = props

    const { codeType, setCodeType } = React.use(DemoContext)

    if (files && files.length > 1) {
        return <FilesCodePreview files={files} entryName={entryName} error={error} onSourceChange={onSourceChange} />
    }

    const sourceCodes = useMemo<Codes>(() => {
        const codes: Codes = {}
        if (sourceCode) {
            codes.tsx = sourceCode.trim()
        }
        if (jsxCode) {
            codes.jsx = jsxCode.trim()
        }
        if (styleCode) {
            codes.style = styleCode.trim()
        }
        return codes
    }, [sourceCode, jsxCode, styleCode])

    const codeTypes = useMemo<CodeType[]>(() => {
        const types: CodeType[] = []
        if (sourceCodes.tsx) {
            types.push('tsx')
        }
        if (sourceCodes.jsx) {
            types.push('jsx')
        }
        if (sourceCodes.style) {
            types.push('style')
        }
        return types
    }, [sourceCodes])

    const [highlightedCodes, setHighlightedCodes] = React.useState<Codes>({})

    useEffect(() => {
        const codes: Codes = {}
        if (sourceCodes.tsx) {
            codes.tsx = Prism.highlight(sourceCodes.tsx, Prism.languages.jsx || Prism.languages.javascript, 'jsx')
        }
        if (sourceCodes.jsx) {
            codes.jsx = Prism.highlight(sourceCodes.jsx, Prism.languages.jsx || Prism.languages.javascript, 'jsx')
        }
        if (sourceCodes.style) {
            codes.style = Prism.highlight(sourceCodes.style, Prism.languages.css, 'css')
        }
        setHighlightedCodes(codes)
    }, [sourceCodes])

    if (!codeTypes.length) {
        return null
    }

    if (codeTypes.length === 1) {
        return (
            <LiveCode
                key={sourceCode}
                error={error}
                lang={codeTypes[0]}
                initialValue={sourceCodes[codeTypes[0]] ?? ''}
                onChange={(code: string) => {
                    onSourceChange?.({ [entryName]: code })
                }}
            />
        )
    }

    return (
        <Tabs className="highlight" value={codeType} onChange={setCodeType} keepMounted={false}>
            <Tabs.List position="center">
                {codeTypes.map(lang => (
                    <Tabs.Tab key={lang} value={lang}>
                        {LANGS[lang]}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
            {codeTypes.map(lang => (
                <Tabs.Panel key={lang} value={lang}>
                    <div className={styles.code}>
                        {lang === 'tsx' ? (
                            <LiveCode
                                key={sourceCodes[lang]}
                                error={error}
                                lang={lang}
                                initialValue={sourceCodes[lang] ?? ''}
                                onChange={(code: string) => {
                                    onSourceChange?.({ [entryName]: code })
                                }}
                            />
                        ) : (
                            toReactComponent([
                                'pre',
                                { lang, highlighted: highlightedCodes[lang] ?? sourceCodes[lang] }
                            ])
                        )}
                        {/* button 嵌套 button 会导致水合失败，这里需要用 div 标签，不能用 button */}
                        <CopyButton value={sourceCodes[lang] ?? ''}>
                            {({ copied, copy }) => (
                                <div
                                    className={clsx(styles.copyButton, copied && styles.copyButtonSuccess)}
                                    onClick={copy}
                                    role="button"
                                    aria-label="Copy code"
                                >
                                    {copied ? <AiOutlineCheck /> : <AiOutlineCopy />}
                                </div>
                            )}
                        </CopyButton>
                    </div>
                </Tabs.Panel>
            ))}
        </Tabs>
    )
}

export default CodePreview
