import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Affix } from './Affix'

describe('Affix', () => {
    it('renders children', () => {
        render(
            <UIProvider>
                <Affix>fixed content</Affix>
            </UIProvider>
        )

        expect(screen.getByText('fixed content')).toBeInTheDocument()
    })

    it('supports custom position', () => {
        render(
            <UIProvider>
                <Affix position={{ top: 20, left: 30 }}>fixed content</Affix>
            </UIProvider>
        )

        const element = screen.getByText('fixed content')
        expect(element).toHaveClass('ui-Affix-root')
    })
})
