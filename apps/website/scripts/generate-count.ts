import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '../../..')
const PAGES_DIR = path.join(__dirname, '../src/pages')
const DEMOS_DIR = path.join(ROOT_DIR, 'packages/@react-ui/docs-demos/src')
const OUTPUT_PATH = path.join(__dirname, '../.docgen/count.json')

function collectFiles(dir: string, predicate: (p: string) => boolean): string[] {
    if (!fs.existsSync(dir)) return []
    return fs
        .readdirSync(dir, { recursive: true })
        .map((p) => path.join(dir, p as string))
        .filter((p) => fs.statSync(p).isFile() && predicate(p))
}

function main() {
    const components = [
        ...collectFiles(path.join(PAGES_DIR, 'core'), (p) => p.endsWith('.mdx')),
        ...collectFiles(path.join(PAGES_DIR, 'dates'), (p) => p.endsWith('.mdx')),
        ...collectFiles(path.join(PAGES_DIR, 'x'), (p) => p.endsWith('.mdx'))
    ]

    const hooks = collectFiles(path.join(PAGES_DIR, 'hooks'), (p) => p.endsWith('.mdx'))
    const pages = collectFiles(PAGES_DIR, (p) => p.endsWith('.mdx'))
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
