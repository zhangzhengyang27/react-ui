import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
    it('renders with label, description and error', () => {
        render(
            <UIProvider>
                <PasswordInput
                    label="Password"
                    description="Enter your password"
                    error="Invalid password"
                    placeholder="******"
                />
            </UIProvider>
        )

        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByText('Enter your password')).toBeInTheDocument()
        expect(screen.getByText('Invalid password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('******')).toBeInTheDocument()
    })

    it('toggles password visibility', () => {
        render(
            <UIProvider>
                <PasswordInput defaultValue="secret" />
            </UIProvider>
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
            <UIProvider>
                <PasswordInput disabled />
            </UIProvider>
        )

        const input = document.querySelector('input[type="password"]')
        expect(input).toBeDisabled()
        expect(screen.getByLabelText('Show password')).toBeDisabled()
    })

    it('gives consumer rightSection precedence over the visibility toggle', () => {
        const custom = render(
            <UIProvider>
                <PasswordInput defaultValue="secret" rightSection={<span data-testid="custom-right-section" />} />
            </UIProvider>
        )

        expect(screen.getByTestId('custom-right-section')).toBeInTheDocument()
        // 内部切换按钮让位，右侧 section 只有一个（不与切换按钮堆叠）
        expect(screen.queryByLabelText('Show password')).not.toBeInTheDocument()
        expect(custom.container.querySelectorAll('div[data-position="right"]')).toHaveLength(1)
        expect(custom.container.querySelector('div[data-position="right"] svg')).toBeNull()

        // 未传 rightSection 时维持原有渲染：eye 切换按钮仍在右侧
        const fallback = render(
            <UIProvider>
                <PasswordInput defaultValue="secret" />
            </UIProvider>
        )
        expect(fallback.getByLabelText('Show password')).toBeInTheDocument()
        expect(fallback.container.querySelectorAll('div[data-position="right"]')).toHaveLength(1)
    })
})
