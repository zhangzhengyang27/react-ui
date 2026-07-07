import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Project, InterfaceDeclaration, TypeAliasDeclaration, Node, Type, JSDocTag } from 'ts-morph'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '../../..')
const COMPONENTS_DIR = path.join(ROOT_DIR, 'packages/ui/src/components')
const OUTPUT_PATH = path.join(__dirname, '../.docgen/docgen.json')

interface PropDoc {
    name: string
    type: string
    required: boolean
    defaultValue: string | null
    description: string
}

interface ComponentDoc {
    displayName: string
    description: string
    props: PropDoc[]
    stylesNames: string[]
    cssVariables: Record<string, string[]>
    variants: string[]
}

function getLiteralStringValues(type: Type): string[] {
    if (type.isUnion()) {
        return type.getUnionTypes().flatMap(getLiteralStringValues)
    }
    if (type.isIntersection()) {
        return type.getIntersectionTypes().flatMap(getLiteralStringValues)
    }
    if (type.isStringLiteral()) {
        return [type.getLiteralValue() as string]
    }
    return []
}

function resolveReferencedTypeAlias(typeAlias: TypeAliasDeclaration): TypeAliasDeclaration {
    const typeNode = typeAlias.getTypeNode()
    if (Node.isTypeReference(typeNode)) {
        let symbol = typeNode.getTypeName().getSymbol()
        if (symbol) {
            const aliased = symbol.getAliasedSymbol()
            if (aliased) symbol = aliased
            const declaration = symbol.getDeclarations()[0]
            if (declaration && Node.isTypeAliasDeclaration(declaration)) {
                return resolveReferencedTypeAlias(declaration)
            }
        }
    }
    return typeAlias
}

function extractStringUnion(typeAlias?: TypeAliasDeclaration): string[] | undefined {
    if (!typeAlias) return undefined
    const resolved = resolveReferencedTypeAlias(typeAlias)
    const type = resolved.getType()
    const values = getLiteralStringValues(type)
    return values.length > 0 ? values : undefined
}

function extractCssVariables(typeAlias?: TypeAliasDeclaration): Record<string, string[]> | undefined {
    if (!typeAlias) return undefined
    const resolved = resolveReferencedTypeAlias(typeAlias)
    const typeNode = resolved.getTypeNode()
    if (!typeNode || !Node.isTypeLiteral(typeNode)) return undefined

    const result: Record<string, string[]> = {}
    for (const member of (typeNode as import('ts-morph').TypeLiteralNode).getMembers()) {
        if (!Node.isPropertySignature(member)) continue
        const name = member.getName()
        const values = getLiteralStringValues(member.getType())
        if (values.length > 0) {
            result[name] = values
        }
    }
    return Object.keys(result).length > 0 ? result : undefined
}

function cleanDescription(text: string): string {
    return text
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '').trim())
        .filter(line => line && !line.startsWith('@'))
        .join(' ')
        .trim()
}

function getDefaultFromTags(tags: JSDocTag[]): string | null {
    for (const tag of tags) {
        if (tag.getTagName() === 'default') {
            const comment = tag.getCommentText()
            if (comment) return comment.trim()
        }
    }
    return null
}

function parseInterfacePropertyTags(
    iface: InterfaceDeclaration
): Record<string, { defaultValue?: string; description: string }> {
    const jsDoc = iface.getJsDocs()[0]
    if (!jsDoc) return {}

    const map: Record<string, { defaultValue?: string; description: string }> = {}
    for (const tag of jsDoc.getTags()) {
        if (tag.getTagName() !== 'property') continue
        const text = tag.getText()
        // Remove leading '* ' and '@property '
        const line = text.replace(/^[\s*]*@property\s*/, '')
        const typeMatch = line.match(/^\{([^}]+)\}\s*/)
        if (!typeMatch) continue

        const rest = line.slice(typeMatch[0].length)
        // [name=default] or [name] or name
        const nameMatch = rest.match(/^(\[?)([\w]+)(?:=([^\]]+))?\]?\s*/)
        if (!nameMatch) continue

        const name = nameMatch[2]
        const defaultValue = nameMatch[3]?.trim()
        const description = rest.slice(nameMatch[0].length).replace(/^-\s*/, '').trim()

        map[name] = { defaultValue, description }
    }
    return map
}

function extractProps(iface: InterfaceDeclaration): PropDoc[] {
    const parentTagMap = parseInterfacePropertyTags(iface)

    return iface
        .getProperties()
        .filter(prop => !prop.getName().startsWith('__'))
        .map(prop => {
            const rawName = prop.getName()
            const name = rawName.replace(/^['"]|['"]$/g, '')
            const required = !prop.hasQuestionToken()

            let type = prop.getTypeNode()?.getText() ?? prop.getType().getText(prop)
            if (!required && type.endsWith(' | undefined')) {
                type = type.slice(0, -' | undefined'.length).trim()
            }

            let description = ''
            let defaultValue: string | null = null

            const propJsDoc = prop.getJsDocs()[0]
            if (propJsDoc) {
                description = cleanDescription(propJsDoc.getDescription())
                defaultValue = getDefaultFromTags(propJsDoc.getTags())
            } else if (parentTagMap[rawName]) {
                description = cleanDescription(parentTagMap[rawName].description)
                if (parentTagMap[rawName].defaultValue) {
                    defaultValue = parentTagMap[rawName].defaultValue!
                }
            }

            return {
                name,
                type,
                required,
                defaultValue,
                description
            }
        })
}

function generateComponentDoc(project: Project, componentName: string, mainFilePath: string): ComponentDoc | null {
    let sourceFile = project.getSourceFile(mainFilePath)
    if (!sourceFile) {
        sourceFile = project.addSourceFileAtPath(mainFilePath)
    }

    const propsInterface = sourceFile.getInterface(`${componentName}Props`)
    if (!propsInterface) {
        console.warn(`[docgen] ${componentName}: interface ${componentName}Props not found`)
        return null
    }

    const stylesNamesAlias = sourceFile.getTypeAlias(`${componentName}StylesNames`)
    const cssVariablesAlias = sourceFile.getTypeAlias(`${componentName}CssVariables`)
    const variantAlias = sourceFile.getTypeAlias(`${componentName}Variant`)

    const props = extractProps(propsInterface)
    const stylesNames = extractStringUnion(stylesNamesAlias) ?? []
    const cssVariables = extractCssVariables(cssVariablesAlias) ?? {}
    const variants = extractStringUnion(variantAlias) ?? []

    return {
        displayName: componentName,
        description: '',
        props,
        stylesNames,
        cssVariables,
        variants
    }
}

function main() {
    const project = new Project({
        tsConfigFilePath: path.join(ROOT_DIR, 'tsconfig.json')
    })

    const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    const docs: Record<string, ComponentDoc> = {}

    for (const entry of entries) {
        if (!entry.isDirectory()) continue
        const componentName = entry.name
        const mainFilePath = path.join(COMPONENTS_DIR, componentName, `${componentName}.tsx`)
        if (!fs.existsSync(mainFilePath)) {
            console.warn(`[docgen] ${componentName}: main file not found, skipping`)
            continue
        }

        const doc = generateComponentDoc(project, componentName, mainFilePath)
        if (doc) {
            docs[componentName] = doc
        }
    }

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(docs, null, 2), 'utf-8')
    console.log(`[docgen] Generated ${Object.keys(docs).length} component docs -> ${OUTPUT_PATH}`)
}

main()
