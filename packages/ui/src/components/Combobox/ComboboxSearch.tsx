import { forwardRef } from 'react'
import { Input, type InputProps } from '../Input'

export interface ComboboxSearchProps extends InputProps {}

export const ComboboxSearch = forwardRef<HTMLInputElement, ComboboxSearchProps>((props, ref) => (
    <Input ref={ref} {...props} />
))

ComboboxSearch.displayName = '@mantine/core/ComboboxSearch'
