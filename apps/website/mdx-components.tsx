import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Demo } from './components/Demo'
import { ApiTable } from './components/ApiTable'

const themeComponents = getThemeComponents()

export function useMDXComponents(components: Record<string, React.ComponentType> = {}) {
    return {
        ...themeComponents,
        Demo,
        ApiTable,
        ...components
    }
}
