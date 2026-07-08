import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * 把 mdx 中「手写 code={`...`}」的 <Demo> 块自动改为 demoId 单源化写法。
 * 规则：
 *  - 仅处理导入了 @/demos/<x> 的 mdx 文件（说明该 demo 有真实文件）
 *  - 在一个 <Demo>...</Demo> 块内，若存在 code={`...`} 且其子节点中出现了某个
 *    @/demos 导入的组件，则把 code 属性替换为 demoId="<小写路径>"
 *  - 不触碰 Playground（code={renderCode(...)} 非模板字符串，不匹配）与无 @/demos 导入的概念页
 */

const ROOT = process.cwd()
const APP_DIR = join(ROOT, 'app')

const importRe = /import\s+(\w+)\s+from\s+['"]@\/demos\/([\w/-]+)['"]/g
const demoBlockRe = /<Demo\b[\s\S]*?<\/Demo>/g
const codeAttrRe = /code=\{`[\s\S]*?`\}/

function walk(dir: string): string[] {
    const out: string[] = []
    for (const name of readdirSync(dir)) {
        const full = join(dir, name)
        const st = statSync(full)
        if (st.isDirectory()) out.push(...walk(full))
        else if (name.endsWith('.mdx')) out.push(full)
    }
    return out
}

function main() {
    const files = walk(APP_DIR)
    let changed = 0

    for (const file of files) {
        const src = readFileSync(file, 'utf-8')

        // 建立 本地名 -> demoId 映射
        const map = new Map<string, string>()
        importRe.lastIndex = 0
        let m: RegExpExecArray | null
        while ((m = importRe.exec(src))) {
            const local = m[1]
            const rel = m[2].replace(/\.(tsx|ts)$/, '').toLowerCase()
            map.set(local, rel)
        }
        if (map.size === 0) continue

        const newSrc = src.replace(demoBlockRe, block => {
            if (!codeAttrRe.test(block)) return block

            // 找块内第一个属于 @/demos 导入的子组件
            const afterOpen = block.slice(block.indexOf('>') + 1)
            const tags = [...afterOpen.matchAll(/<([A-Z]\w*)/g)].map(x => x[1])
            const local = tags.find(t => map.has(t))
            if (!local) return block

            const id = map.get(local)!
            return block.replace(codeAttrRe, `demoId="${id}"`)
        })

        if (newSrc !== src) {
            writeFileSync(file, newSrc, 'utf-8')
            changed++
        }
    }

    console.log(`[migrate-demos] Updated ${changed} mdx files`)
}

main()
