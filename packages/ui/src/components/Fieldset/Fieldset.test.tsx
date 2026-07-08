import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Fieldset } from './Fieldset'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Fieldset', () => {
    it('renders children', () => {
        renderWithProvider(
            <Fieldset data-testid="fieldset">
                <span data-testid="child">content</span>
            </Fieldset>
        )
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('renders legend', () => {
        renderWithProvider(<Fieldset legend="联系信息" data-testid="fieldset" />)
        expect(screen.getByText('联系信息')).toBeInTheDocument()
    })

    it('sets disabled attribute', () => {
        renderWithProvider(
            <Fieldset disabled data-testid="fieldset">
                <input data-testid="input" />
            </Fieldset>
        )
        expect(screen.getByTestId('fieldset')).toBeDisabled()
    })
})
