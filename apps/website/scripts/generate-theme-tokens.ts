import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Project, Node, SyntaxKind } from 'ts-morph'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '../../..')
const THEME_FILE = path.join(ROOT_DIR, 'packages/ui/src/core/MantineProvider/default-theme.ts')
const COLORS_FILE = path.join(ROOT_DIR, 'packages/ui/src/core/MantineProvider/default-colors.ts')
const OUTPUT_PATH = path.join(__dirname, '../.docgen/theme-tokens.json')

/** rem(n) -> `${n/16}rem`（默认 16px 基准） */
function resolveRem(n: number): string {
    return `${n / 16}rem`
}

/** 把字符串里的 rem(number) 调用解析为实际 rem 值（用于 shadows 等模板字符串） */
function resolveRemInString(text: string): string {
    return text.replace(/rem\((\d+(?:\.\d+)?)\)/g, (_m, num) => resolveRem(Number(num)))
}

/** 递归把 ts-morph 节点求值为可序列化的 JS 值 */
function evalNode(node: import('ts-morph').Node): unknown {
    if (Node.isStringLiteral(node)) return node.getLiteralText()
    if (Node.isNumericLiteral(node)) return Number(node.getLiteralText())
    if (node.getKind() === SyntaxKind.TrueKeyword) return true
    if (node.getKind() === SyntaxKind.FalseKeyword) return false
    if (Node.isNoSubstitutionTemplateLiteral(node)) return resolveRemInString(node.getLiteralText())
    if (Node.isTemplateExpression(node)) {
        let result = resolveRemInString(node.getHead().getLiteralText())
        for (const span of node.getTemplateSpans()) {
            const exprVal = evalNode(span.getExpression())
            result += typeof exprVal === 'string' ? resolveRemInString(exprVal) : String(exprVal)
            result += resolveRemInString(span.getLiteral().getLiteralText())
        }
        return result
    }
    if (Node.isArrayLiteralExpression(node)) return node.getElements().map(evalNode)
    if (Node.isCallExpression(node)) {
        const fn = node.getExpression().getText()
        if (fn === 'rem') {
            const arg = node.getArguments()[0]
            if (Node.isNumericLiteral(arg)) return resolveRem(Number(arg.getLiteralText()))
        }
        return node.getText()
    }
    if (Node.isIdentifier(node)) return node.getText()
    if (Node.isPropertyAccessExpression(node)) return node.getText()
    if (Node.isObjectLiteralExpression(node)) {
        const obj: Record<string, unknown> = {}
        for (const prop of node.getProperties()) {
            if (Node.isPropertyAssignment(prop)) {
                const name = prop.getName()?.replace(/^['"]|['"]$/g, '')
                const init = prop.getInitializer()
                if (name && init) obj[name] = evalNode(init)
            }
        }
        return obj
    }
    return node.getText()
}

/** 从源文件中提取指定变量声明的初始化对象并求值 */
function evalExportedObject(filePath: string, varName: string): Record<string, unknown> | null {
    const project = new Project({ useInMemoryFileSystem: true })
    const sourceText = fs.readFileSync(filePath, 'utf-8')
    const sourceFile = project.createSourceFile(filePath, sourceText)

    const decl = sourceFile.getVariableDeclaration(varName)
    if (!decl) return null
    const init = decl.getInitializer()
    if (!init || !Node.isObjectLiteralExpression(init)) return null
    return evalNode(init) as Record<string, unknown>
}

function main() {
    const colors = evalExportedObject(COLORS_FILE, 'DEFAULT_COLORS') ?? {}
    const theme = evalExportedObject(THEME_FILE, 'DEFAULT_THEME') ?? {}

    // default-theme.ts 里 colors 是 DEFAULT_COLORS 引用（Identifier），注入实际值
    if (typeof theme.colors === 'string') {
        theme.colors = colors
    }

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(theme, null, 2), 'utf-8')
    console.log(
        `[theme-tokens] Generated theme tokens -> ${OUTPUT_PATH} ` +
            `(${Object.keys(theme).length} top-level keys, ${Object.keys(colors).length} color palettes)`
    )
}

main()
