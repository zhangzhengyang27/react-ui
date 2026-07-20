import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '../../..')
const COMPONENTS_DIR = path.join(ROOT_DIR, 'packages/ui/src/components')
const CORE_DIR = path.join(ROOT_DIR, 'packages/ui/src/core')
const OUTPUT_PATH = path.join(__dirname, '../.docgen/css-exports.json')

function transformFileName(filePath: string) {
    return path.basename(filePath).replace('.module.css', '.css')
}

function collectCssFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) return []
    return fs
        .readdirSync(dir, { recursive: true })
        .map((p) => path.join(dir, p as string))
        .filter((p) => fs.statSync(p).isFile() && p.endsWith('.css'))
}

function main() {
    const componentFiles = collectCssFiles(COMPONENTS_DIR)
    const modules = componentFiles
        .filter((file) => file.endsWith('.module.css'))
        .map(transformFileName)
        .sort()

    const global = collectCssFiles(CORE_DIR)
        .filter(
            (file) =>
                file.endsWith('global.css') ||
                file.endsWith('baseline.css') ||
                file.endsWith('default-css-variables.css')
        )
        .map((file) => path.basename(file))
        .sort()

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ modules, global }, null, 2), 'utf-8')
    console.log(`[css-exports] Generated css-exports.json -> ${OUTPUT_PATH}`)
}

main()
