import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '../../..')
const COMPONENTS_DIR = path.join(__dirname, '../components')
const DOCS_DIR = path.join(__dirname, '../docs')
const DEMOS_DIR = path.join(ROOT_DIR, 'packages/@xiaoye-react/docs-demos/src')
const OUTPUT_PATH = path.join(__dirname, '../.docgen/count.json')

function collectFiles(dir: string, predicate: (p: string) => boolean): string[] {
    if (!fs.existsSync(dir)) return []
    return fs
        .readdirSync(dir, { recursive: true })
        .map((p) => path.join(dir, p as string))
        .filter((p) => fs.statSync(p).isFile() && predicate(p))
}

function main() {
    // 组件文档：components/ 下的 .md 文件
    const components = collectFiles(COMPONENTS_DIR, (p) => p.endsWith('.md'))

    // hooks 文档：docs/hooks/ 下的 .md 文件
    const hooks = collectFiles(path.join(DOCS_DIR, 'hooks'), (p) => p.endsWith('.md'))

    // 所有文档页面
    const pages = collectFiles(DOCS_DIR, (p) => p.endsWith('.md'))

    // demos 数量
    const demos = collectFiles(DEMOS_DIR, (p) => /\.demo\..*\.tsx$/.test(p))

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(
        OUTPUT_PATH,
        JSON.stringify(
            {
                components: components.length,
                hooks: hooks.length,
                pages: pages.length,
                demos: demos.length
            },
            null,
            2
        ),
        'utf-8'
    )
    console.log(`[count] Generated count.json -> ${OUTPUT_PATH}`)
}

main()
