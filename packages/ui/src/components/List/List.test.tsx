import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { List } from './List'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('List', () => {
    it('renders unordered list by default', () => {
        renderWithProvider(
            <List data-testid="list">
                <List.Item>First</List.Item>
                <List.Item>Second</List.Item>
            </List>
        )

        const list = screen.getByTestId('list')
        expect(list.tagName).toBe('UL')
        expect(list.children).toHaveLength(2)
    })

    it('renders ordered list when type is ordered', () => {
        renderWithProvider(
            <List type="ordered" data-testid="list">
                <List.Item>First</List.Item>
                <List.Item>Second</List.Item>
            </List>
        )

        expect(screen.getByTestId('list').tagName).toBe('OL')
    })

    it('renders custom icon from List context', () => {
        renderWithProvider(
            <List icon={<span data-testid="icon">★</span>}>
                <List.Item>Item</List.Item>
            </List>
        )

        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('renders custom icon on item level overriding context', () => {
        renderWithProvider(
            <List icon={<span>★</span>}>
                <List.Item icon={<span data-testid="item-icon">●</span>}>Item</List.Item>
            </List>
        )

        expect(screen.getByTestId('item-icon')).toBeInTheDocument()
    })

    it('sets data-center and data-with-padding attributes', () => {
        renderWithProvider(
            <List center withPadding data-testid="list">
                <List.Item data-testid="item">Item</List.Item>
            </List>
        )

        expect(screen.getByTestId('list')).toHaveAttribute('data-center')
        expect(screen.getByTestId('list')).toHaveAttribute('data-with-padding')
        expect(screen.getByTestId('item')).toHaveAttribute('data-center')
    })
})
