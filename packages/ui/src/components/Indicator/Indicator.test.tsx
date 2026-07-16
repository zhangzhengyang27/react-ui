import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Indicator } from './Indicator'

const defaultProps = {}

function Wrapper({ children }: { children: React.ReactNode }) {
    return <UIProvider>{children}</UIProvider>
}

describe('@react-ui/ui/Indicator', () => {
    it('renders given label', () => {
        render(<Indicator {...defaultProps} label="test-label" />, { wrapper: Wrapper })
        expect(screen.getByText('test-label')).toBeInTheDocument()
    })

    it('does not render indicator if component is disabled', () => {
        render(<Indicator {...defaultProps} label="test-label" disabled />, { wrapper: Wrapper })
        expect(screen.queryAllByText('test-label')).toHaveLength(0)
    })

    it('applies processing data attribute', () => {
        const { container } = render(<Indicator {...defaultProps} label="test" processing />, {
            wrapper: Wrapper
        })
        expect(container.querySelector('.ui-Indicator-indicator')).toHaveAttribute('data-processing')
    })

    it('applies with-border data attribute', () => {
        const { container } = render(<Indicator {...defaultProps} label="test" withBorder />, {
            wrapper: Wrapper
        })
        expect(container.querySelector('.ui-Indicator-indicator')).toHaveAttribute('data-with-border')
    })

    it('applies inline data attribute', () => {
        const { container } = render(<Indicator {...defaultProps} label="test" inline />, {
            wrapper: Wrapper
        })
        expect(container.querySelector('.ui-Indicator-root')).toHaveAttribute('data-inline')
    })

    it('formats label with maxValue prop', () => {
        render(<Indicator {...defaultProps} label={100} maxValue={99} />, { wrapper: Wrapper })
        expect(screen.getByText('99+')).toBeInTheDocument()
    })

    it('does not format label when below maxValue', () => {
        render(<Indicator {...defaultProps} label={50} maxValue={99} />, { wrapper: Wrapper })
        expect(screen.getByText('50')).toBeInTheDocument()
    })

    it('does not format non-numeric labels with maxValue', () => {
        render(<Indicator {...defaultProps} label="test" maxValue={99} />, { wrapper: Wrapper })
        expect(screen.getByText('test')).toBeInTheDocument()
    })

    it('hides indicator when label is 0 and showZero is false', () => {
        render(<Indicator {...defaultProps} label={0} showZero={false} />, { wrapper: Wrapper })
        expect(screen.queryAllByText('0')).toHaveLength(0)
    })

    it('shows indicator when label is 0 and showZero is true (default)', () => {
        render(<Indicator {...defaultProps} label={0} />, { wrapper: Wrapper })
        expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('hides indicator when label is "0" string and showZero is false', () => {
        render(<Indicator {...defaultProps} label="0" showZero={false} />, { wrapper: Wrapper })
        expect(screen.queryAllByText('0')).toHaveLength(0)
    })
})
