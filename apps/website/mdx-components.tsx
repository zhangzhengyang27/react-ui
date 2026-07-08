import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Demo } from './components/Demo'
import { ApiTable } from './components/ApiTable'
import { StylesApiTable } from './components/StylesApiTable'
import { ComponentOverview } from './components/ComponentOverview'
import { DemoControls, DemoControl } from './components/DemoControls'
import { CodeBlock } from './components/CodeBlock'
import { HookApiTable } from './components/HookApiTable'

const themeComponents = getThemeComponents()

export function useMDXComponents(components: Record<string, React.ComponentType> = {}) {
    return {
        ...themeComponents,
        Demo,
        ApiTable,
        StylesApiTable,
        ComponentOverview,
        DemoControls,
        DemoControl,
        CodeBlock,
        HookApiTable,
        ...components
    }
}
