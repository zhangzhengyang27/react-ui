import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'

const renderGroup = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('RadioGroup', () => {
    it('selects value when radio is clicked', () => {
        const onChange = vi.fn()
        renderGroup(
            <RadioGroup onChange={onChange}>
                <Radio value="react" label="React" />
                <Radio value="vue" label="Vue" />
                <Radio value="angular" label="Angular" />
            </RadioGroup>
        )

        fireEvent.click(screen.getByLabelText('Vue'))
        expect(onChange).toHaveBeenCalledWith('vue')
    })

    it('supports defaultValue', () => {
        renderGroup(
            <RadioGroup defaultValue="react">
                <Radio value="react" label="React" />
                <Radio value="vue" label="Vue" />
            </RadioGroup>
        )

        expect(screen.getByLabelText('React')).toBeChecked()
        expect(screen.getByLabelText('Vue')).not.toBeChecked()
    })

    it('changes selection when another radio is clicked', () => {
        const onChange = vi.fn()
        renderGroup(
            <RadioGroup defaultValue="react" onChange={onChange}>
                <Radio value="react" label="React" />
                <Radio value="vue" label="Vue" />
            </RadioGroup>
        )

        fireEvent.click(screen.getByLabelText('Vue'))
        expect(onChange).toHaveBeenCalledWith('vue')
    })

    it('renders label and error', () => {
        renderGroup(
            <RadioGroup label="Framework" error="Required" data-testid="group">
                <Radio value="react" label="React" />
            </RadioGroup>
        )

        expect(screen.getByText('Framework')).toBeInTheDocument()
        expect(screen.getByText('Required')).toBeInTheDocument()
    })
})
