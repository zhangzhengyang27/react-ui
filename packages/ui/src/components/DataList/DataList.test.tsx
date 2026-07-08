import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { DataList } from './DataList'
import { DataListItem } from './DataListItem/DataListItem'
import { DataListItemLabel } from './DataListItemLabel/DataListItemLabel'
import { DataListItemValue } from './DataListItemValue/DataListItemValue'

function Wrapper({ children }: { children: React.ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>
}

const defaultProps = {
    children: (
        <>
            <DataList.Item>
                <DataList.ItemLabel>Label</DataList.ItemLabel>
                <DataList.ItemValue>Value</DataList.ItemValue>
            </DataList.Item>
        </>
    )
}

describe('@react-ui/ui/DataList', () => {
    it('renders dl element', () => {
        const { container } = render(<DataList {...defaultProps} />, { wrapper: Wrapper })
        expect(container.querySelector('dl')).not.toBe(null)
    })

    it('renders dt and dd elements', () => {
        const { container } = render(<DataList {...defaultProps} />, { wrapper: Wrapper })
        expect(container.querySelector('dt')).not.toBe(null)
        expect(container.querySelector('dd')).not.toBe(null)
    })

    it('sets data-orientation attribute', () => {
        const { container } = render(<DataList {...defaultProps} orientation="horizontal" />, {
            wrapper: Wrapper
        })
        expect(container.querySelector('[data-orientation]')).toHaveAttribute('data-orientation', 'horizontal')
    })

    it('sets data-with-divider attribute', () => {
        const { container } = render(<DataList {...defaultProps} withDivider />, {
            wrapper: Wrapper
        })
        expect(container.querySelector('[data-with-divider]')).toBeInTheDocument()
    })

    it('exposes sub-components as static properties', () => {
        expect(DataList.Item).toBe(DataListItem)
        expect(DataList.ItemLabel).toBe(DataListItemLabel)
        expect(DataList.ItemValue).toBe(DataListItemValue)
    })
})
