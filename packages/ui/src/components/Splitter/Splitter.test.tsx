import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Splitter } from './Splitter'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Splitter', () => {
    it('renders panels and resizer', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        expect(screen.getByTestId('splitter')).toBeInTheDocument()
        expect(screen.getByTestId('panel-1')).toHaveTextContent('Panel 1')
        expect(screen.getByTestId('panel-2')).toHaveTextContent('Panel 2')
        expect(screen.getAllByRole('separator')).toHaveLength(1)
    })

    it('supports vertical orientation', () => {
        renderWithProvider(
            <Splitter orientation="vertical" data-testid="splitter">
                <Splitter.Panel>Panel 1</Splitter.Panel>
                <Splitter.Panel>Panel 2</Splitter.Panel>
            </Splitter>
        )

        expect(screen.getByTestId('splitter')).toHaveAttribute('data-orientation', 'vertical')
    })

    it('updates panel sizes on resizer drag', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        const resizer = screen.getAllByRole('separator')[0]
        fireEvent.mouseDown(resizer, { clientX: 200, clientY: 100 })
        fireEvent.mouseMove(document, { clientX: 300, clientY: 100 })
        fireEvent.mouseUp(document)

        const panel1 = screen.getByTestId('panel-1')
        const panel2 = screen.getByTestId('panel-2')
        expect(panel1.style.flexBasis).toContain('%')
        expect(panel2.style.flexBasis).toContain('%')
    })
})
