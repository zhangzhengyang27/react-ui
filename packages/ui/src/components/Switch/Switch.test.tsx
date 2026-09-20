import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Switch } from './Switch'

const renderSwitch = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('Switch', () => {
    it('renders with label', () => {
        renderSwitch(<Switch label="Enable feature" />)
        expect(screen.getByText('Enable feature')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('toggles on click', () => {
        const onChange = vi.fn()
        renderSwitch(<Switch onChange={onChange} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()

        fireEvent.click(checkbox)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(checkbox).toBeChecked()

        fireEvent.click(checkbox)
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(checkbox).not.toBeChecked()
    })

    it('supports defaultChecked', () => {
        renderSwitch(<Switch defaultChecked />)
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('supports controlled checked state', () => {
        const { rerender } = renderSwitch(<Switch checked />)
        expect(screen.getByRole('checkbox')).toBeChecked()

        rerender(
            <UIProvider>
                <Switch checked={false} />
            </UIProvider>
        )
        expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('disabled prevents change', () => {
        const onChange = vi.fn()
        renderSwitch(<Switch disabled onChange={onChange} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeDisabled()

        fireEvent.click(checkbox)
        expect(onChange).not.toHaveBeenCalled()
        expect(checkbox).not.toBeChecked()
    })

    it('renders onLabel and offLabel', () => {
        renderSwitch(<Switch onLabel="ON" offLabel="OFF" />)
        expect(screen.getByText('ON')).toBeInTheDocument()
        expect(screen.getByText('OFF')).toBeInTheDocument()
    })

    it('renders description and error next to the label, and flags the root', () => {
        renderSwitch(<Switch label="同意" description="说明文字" error="必选项" />)

        const labelEl = screen.getByText('同意')
        const body = labelEl.parentElement!

        // 三行排在同一个 body 容器里，而不是散在 root 上
        expect(screen.getByText('说明文字').parentElement).toBe(body)
        expect(screen.getByText('必选项').parentElement).toBe(body)
        expect(body.children).toHaveLength(3)
        expect(body.parentElement?.tagName).toBe('LABEL')
        expect(body.parentElement?.hasAttribute('data-error')).toBe(true)

        // 只给 label 时不渲染 description/error 节点，也不打 data-error
        const plain = renderSwitch(<Switch label="只有标签" />)
        const plainBody = plain.getByText('只有标签').parentElement!
        expect(plainBody.children).toHaveLength(1)
        expect(plainBody.parentElement?.hasAttribute('data-error')).toBe(false)
    })
})
