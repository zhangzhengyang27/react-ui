import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Affix } from './Affix'

describe('Affix', () => {
    it('renders children', () => {
        render(
            <MantineProvider>
                <Affix>fixed content</Affix>
            </MantineProvider>
        )

        expect(screen.getByText('fixed content')).toBeInTheDocument()
    })

    it('supports custom position', () => {
        render(
            <MantineProvider>
                <Affix position={{ top: 20, left: 30 }}>fixed content</Affix>
            </MantineProvider>
        )

        const element = screen.getByText('fixed content')
        expect(element).toHaveClass('mantine-Affix-root')
    })
})
