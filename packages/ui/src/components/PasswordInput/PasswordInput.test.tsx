import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
    it('renders with label, description and error', () => {
        render(
            <MantineProvider>
                <PasswordInput
                    label="Password"
                    description="Enter your password"
                    error="Invalid password"
                    placeholder="******"
                />
            </MantineProvider>
        )

        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByText('Enter your password')).toBeInTheDocument()
        expect(screen.getByText('Invalid password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('******')).toBeInTheDocument()
    })

    it('toggles password visibility', () => {
        render(
            <MantineProvider>
                <PasswordInput defaultValue="secret" />
            </MantineProvider>
        )

        const input = screen.getByDisplayValue('secret')
        expect(input).toHaveAttribute('type', 'password')

        fireEvent.click(screen.getByLabelText('Show password'))
        expect(input).toHaveAttribute('type', 'text')

        fireEvent.click(screen.getByLabelText('Hide password'))
        expect(input).toHaveAttribute('type', 'password')
    })

    it('disables input and toggle button', () => {
        render(
            <MantineProvider>
                <PasswordInput disabled />
            </MantineProvider>
        )

        const input = document.querySelector('input[type="password"]')
        expect(input).toBeDisabled()
        expect(screen.getByLabelText('Show password')).toBeDisabled()
    })
})
