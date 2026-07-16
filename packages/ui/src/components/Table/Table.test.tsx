import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Table } from './Table'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

describe('Table', () => {
    it('renders children as a compound component', () => {
        render(
            <Table>
                <caption>Monthly expenses</caption>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Item</Table.Th>
                        <Table.Th>Price</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>Apple</Table.Td>
                        <Table.Td>1</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>,
            { wrapper }
        )

        expect(screen.getByText('Monthly expenses')).toBeInTheDocument()
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('auto-generates thead and tbody from data', () => {
        render(
            <Table
                data={[
                    ['Name', 'Age'],
                    ['Alice', '24'],
                    ['Bob', '30']
                ]}
            />,
            { wrapper }
        )

        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getAllByRole('columnheader')).toHaveLength(2)
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
    })

    it('applies data attributes for boolean modifiers', () => {
        const { container } = render(
            <Table data={[['A'], ['B']]} striped highlightOnHover withTableBorder withColumnBorders withRowBorders />,
            { wrapper }
        )

        const table = container.querySelector('table')
        expect(table).toHaveAttribute('data-striped')
        expect(table).toHaveAttribute('data-highlight-on-hover')
        expect(table).toHaveAttribute('data-with-table-border')
        expect(table).toHaveAttribute('data-with-column-borders')
        expect(table).toHaveAttribute('data-with-row-borders')
    })

    it('sets caption-side via captionSide prop', () => {
        const { container } = render(<Table data={[['A'], ['B']]} captionSide="bottom" />, { wrapper })

        const table = container.querySelector('table')
        expect(table?.style.getPropertyValue('--table-caption-side')).toBe('bottom')
    })
})
