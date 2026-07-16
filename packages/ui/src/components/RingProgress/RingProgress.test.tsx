import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { RingProgress } from './RingProgress'

describe('RingProgress', () => {
    it('renders ring progress with sections', () => {
        render(
            <UIProvider>
                <RingProgress sections={[{ value: 60, color: 'blue' }]} data-testid="ring" />
            </UIProvider>
        )

        expect(screen.getByTestId('ring')).toBeInTheDocument()
        expect(screen.getByTestId('ring').querySelector('svg')).toBeInTheDocument()
    })

    it('renders center label', () => {
        render(
            <UIProvider>
                <RingProgress sections={[{ value: 50 }]} label="50%" />
            </UIProvider>
        )

        expect(screen.getByText('50%')).toBeInTheDocument()
    })

    it('renders multiple sections', () => {
        render(
            <UIProvider>
                <RingProgress
                    sections={[
                        { value: 30, color: 'blue' },
                        { value: 20, color: 'green' }
                    ]}
                />
            </UIProvider>
        )

        const paths = document.querySelectorAll('path')
        expect(paths.length).toBe(2)
    })
})
