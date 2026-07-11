import { useUncontrolled } from '@react-ui/hooks'
import { useProps } from '../../core'
import { MenuRadioGroupContext } from './MenuRadioGroup.context'

export interface MenuRadioGroupProps {
    /** Controlled selected value */
    value?: string | null

    /** Uncontrolled default selected value */
    defaultValue?: string | null

    /** Called with the new value when a `Menu.RadioItem` is selected */
    onChange?: (value: string) => void

    /** `Menu.RadioItem` components and other elements */
    children?: React.ReactNode
}

export function MenuRadioGroup(_props: MenuRadioGroupProps) {
    const props = useProps('MenuRadioGroup', null, _props)
    const { value, defaultValue, onChange, children } = props

    const [_value, setValue] = useUncontrolled<string | null>({
        value,
        defaultValue,
        finalValue: null,
        onChange: onChange as (value: string | null) => void
    })

    return (
        <MenuRadioGroupContext.Provider
            value={{ value: _value, onChange: (next: string) => setValue(next) }}
        >
            {children}
        </MenuRadioGroupContext.Provider>
    )
}

MenuRadioGroup.displayName = '@react-ui/ui/MenuRadioGroup'
