import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { Stepper } from './Stepper'

const renderStepper = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Stepper', () => {
    it('renders steps with labels and descriptions', () => {
        renderStepper(
            <Stepper>
                <Stepper.Step label="Step 1" description="Description 1" />
                <Stepper.Step label="Step 2" description="Description 2" />
            </Stepper>
        )

        expect(screen.getByText('Step 1')).toBeInTheDocument()
        expect(screen.getByText('Description 1')).toBeInTheDocument()
        expect(screen.getByText('Step 2')).toBeInTheDocument()
        expect(screen.getByText('Description 2')).toBeInTheDocument()
    })

    it('marks steps before active index as completed and active step as active', () => {
        const { container } = renderStepper(
            <Stepper active={1}>
                <Stepper.Step label="Step 1" />
                <Stepper.Step label="Step 2" />
                <Stepper.Step label="Step 3" />
            </Stepper>
        )

        const steps = container.querySelectorAll('[data-active], [data-completed]')
        expect(steps.length).toBe(2)
        expect(container.querySelectorAll('[data-active]').length).toBe(1)
        expect(container.querySelectorAll('[data-completed]').length).toBe(1)
    })

    it('renders vertical orientation', () => {
        const { container } = renderStepper(
            <Stepper orientation="vertical">
                <Stepper.Step label="Step 1" />
            </Stepper>
        )

        expect(container.querySelector('[data-orientation="vertical"]')).toBeInTheDocument()
    })

    it('calls onStepClick when a selectable step is clicked', () => {
        const handleClick = vi.fn()
        renderStepper(
            <Stepper allowSelectStep onStepClick={handleClick}>
                <Stepper.Step label="Step 1" />
                <Stepper.Step label="Step 2" />
            </Stepper>
        )

        screen.getByText('Step 2').closest('button')!.click()
        expect(handleClick).toHaveBeenCalledWith(1)
    })

    it('does not call onStepClick when allowSelectStep is false', () => {
        const handleClick = vi.fn()
        renderStepper(
            <Stepper onStepClick={handleClick}>
                <Stepper.Step label="Step 1" />
            </Stepper>
        )

        screen.getByText('Step 1').closest('button')!.click()
        expect(handleClick).not.toHaveBeenCalled()
    })

    it('renders custom completed icon for completed steps', () => {
        const { container } = renderStepper(
            <Stepper active={2} completedIcon={<span data-testid="completed-icon" />}>
                <Stepper.Step label="Step 1" />
                <Stepper.Step label="Step 2" />
                <Stepper.Step label="Step 3" />
            </Stepper>
        )

        expect(container.querySelectorAll('[data-testid="completed-icon"]').length).toBe(2)
    })
})
