import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

const renderGroup = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('CheckboxGroup', () => {
    it('selects values when checkboxes are clicked', () => {
        const onChange = vi.fn()
        renderGroup(
            <CheckboxGroup onChange={onChange}>
                <Checkbox value="react" label="React" />
                <Checkbox value="vue" label="Vue" />
                <Checkbox value="angular" label="Angular" />
            </CheckboxGroup>
        )

        fireEvent.click(screen.getByLabelText('React'))
        expect(onChange).toHaveBeenCalledWith(['react'])

        fireEvent.click(screen.getByLabelText('Vue'))
        expect(onChange).toHaveBeenCalledWith(['react', 'vue'])
    })

    it('supports defaultValue', () => {
        renderGroup(
            <CheckboxGroup defaultValue={['react']}>
                <Checkbox value="react" label="React" />
                <Checkbox value="vue" label="Vue" />
            </CheckboxGroup>
        )

        expect(screen.getByLabelText('React')).toBeChecked()
        expect(screen.getByLabelText('Vue')).not.toBeChecked()
    })

    it('unchecks selected value when clicked again', () => {
        const onChange = vi.fn()
        renderGroup(
            <CheckboxGroup defaultValue={['react', 'vue']} onChange={onChange}>
                <Checkbox value="react" label="React" />
                <Checkbox value="vue" label="Vue" />
            </CheckboxGroup>
        )

        fireEvent.click(screen.getByLabelText('React'))
        expect(onChange).toHaveBeenCalledWith(['vue'])
    })

    it('renders label and error', () => {
        renderGroup(
            <CheckboxGroup label="Frameworks" error="Required" data-testid="group">
                <Checkbox value="react" label="React" />
            </CheckboxGroup>
        )

        expect(screen.getByText('Frameworks')).toBeInTheDocument()
        expect(screen.getByText('Required')).toBeInTheDocument()
    })
})
