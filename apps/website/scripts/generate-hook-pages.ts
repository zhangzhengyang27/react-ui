import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const HOOKS_JSON_PATH = path.join(__dirname, '../.docgen/hooks.json')
const HOOKS_DIR = path.join(__dirname, '../app/hooks')

interface HookParamDoc {
    name: string
    type: string
    required: boolean
    defaultValue: string | null
    description: string
}

interface HookDoc {
    name: string
    description: string
    params: HookParamDoc[]
    returns: {
        type: string
        description: string
    }
}

function renderExample(hookName: string, params: HookParamDoc[]): string {
    if (params.length === 0) {
        return `import { ${hookName} } from '@react-ui/hooks'

export default function Example() {
    const result = ${hookName}()
    return <div>{JSON.stringify(result)}</div>
}`
    }

    const firstParam = params[0]
    const args = firstParam.required ? firstParam.name : firstParam.defaultValue ? firstParam.defaultValue : ''

    if (firstParam.type.includes('options') || firstParam.type.includes('Options')) {
        return `import { ${hookName} } from '@react-ui/hooks'

export default function Example() {
    const result = ${hookName}({
        // 配置选项
    })
    return <div>{JSON.stringify(result)}</div>
}`
    }

    return `import { ${hookName} } from '@react-ui/hooks'

export default function Example() {
    const result = ${hookName}(${args})
    return <div>{JSON.stringify(result)}</div>
}`
}

function generatePage(hookName: string, doc: HookDoc): string {
    const example = renderExample(hookName, doc.params)

    return `import { HookApiTable } from '@/components/HookApiTable'
import { Demo } from '@/components/Demo'
import { HookExample } from '@/components/HookExamples'

# ${hookName}

${doc.description || `${hookName} Hook 的使用说明。`}

## 使用示例

<Demo
    title="基础用法"
    description="${hookName} 基础使用示例"
    themeToggle
    rtl
    code={\`${example}\`}
>
    <HookExample hook="${hookName}" />
</Demo>

## API

<HookApiTable hook="${hookName}" />
`
}

function main() {
    if (!fs.existsSync(HOOKS_JSON_PATH)) {
        console.error(`[generate-hook-pages] hooks.json not found at ${HOOKS_JSON_PATH}`)
        process.exit(1)
    }

    const hooks: Record<string, HookDoc> = JSON.parse(fs.readFileSync(HOOKS_JSON_PATH, 'utf-8'))

    fs.mkdirSync(HOOKS_DIR, { recursive: true })

    for (const [hookName, doc] of Object.entries(hooks)) {
        const hookDir = path.join(HOOKS_DIR, hookName.toLowerCase())
        fs.mkdirSync(hookDir, { recursive: true })
        const pagePath = path.join(hookDir, 'page.mdx')
        fs.writeFileSync(pagePath, generatePage(hookName, doc), 'utf-8')
    }

    console.log(`[generate-hook-pages] Generated ${Object.keys(hooks).length} hook pages -> ${HOOKS_DIR}`)
}

main()
