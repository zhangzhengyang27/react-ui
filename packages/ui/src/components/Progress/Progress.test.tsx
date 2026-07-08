import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { Progress } from './Progress'

describe('Progress', () => {
    it('renders progress bar with value', () => {
        render(
            <MantineProvider>
                <Progress value={50} data-testid="progress" />
            </MantineProvider>
        )

        const progress = screen.getByTestId('progress')
        expect(progress).toHaveAttribute('role', 'progressbar')
        expect(progress).toHaveAttribute('aria-valuenow', '50')
    })

    it('renders progress label', () => {
        render(
            <MantineProvider>
                <Progress value={40} label="40%" />
            </MantineProvider>
        )

        expect(screen.getByText('40%')).toBeInTheDocument()
    })

    it('renders multiple sections', () => {
        render(
            <MantineProvider>
                <Progress
                    sections={[
                        { value: 30, color: 'blue', label: 'A' },
                        { value: 20, color: 'green', label: 'B' }
                    ]}
                />
            </MantineProvider>
        )

        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
    })

    it('clamps section values between 0 and 100', () => {
        render(
            <MantineProvider>
                <Progress value={150} data-testid="progress" />
            </MantineProvider>
        )

        const section = screen.getByTestId('progress').firstChild as HTMLElement
        expect(section.style.width).toBe('100%')
    })
})
