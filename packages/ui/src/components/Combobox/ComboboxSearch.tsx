import { forwardRef } from 'react'
import type { ElementProps } from '../../core'
import { Input, type InputProps } from '../Input'

/** Input 把 others 原样透给原生 input，placeholder/value/onChange 等必须在类型里可见 */
export interface ComboboxSearchProps
    extends InputProps,
        ElementProps<'input', 'size' | 'style' | 'ref'> {}

export const ComboboxSearch = forwardRef<HTMLInputElement, ComboboxSearchProps>((props, ref) => (
    <Input ref={ref} {...props} />
))

ComboboxSearch.displayName = '@xiaoye-react/ui/ComboboxSearch'
