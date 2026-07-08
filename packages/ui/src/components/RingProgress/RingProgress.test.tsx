import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { RingProgress } from './RingProgress'

describe('RingProgress', () => {
    it('renders ring progress with sections', () => {
        render(
            <MantineProvider>
                <RingProgress sections={[{ value: 60, color: 'blue' }]} data-testid="ring" />
            </MantineProvider>
        )

        expect(screen.getByTestId('ring')).toBeInTheDocument()
        expect(screen.getByTestId('ring').querySelector('svg')).toBeInTheDocument()
    })

    it('renders center label', () => {
        render(
            <MantineProvider>
                <RingProgress sections={[{ value: 50 }]} label="50%" />
            </MantineProvider>
        )

        expect(screen.getByText('50%')).toBeInTheDocument()
    })

    it('renders multiple sections', () => {
        render(
            <MantineProvider>
                <RingProgress
                    sections={[
                        { value: 30, color: 'blue' },
                        { value: 20, color: 'green' }
                    ]}
                />
            </MantineProvider>
        )

        const paths = document.querySelectorAll('path')
        expect(paths.length).toBe(2)
    })
})
