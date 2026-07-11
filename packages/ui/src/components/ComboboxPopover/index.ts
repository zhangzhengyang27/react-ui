import type {
    ComboboxPopoverFactory,
    ComboboxPopoverProps,
    ComboboxPopoverStylesNames
} from './ComboboxPopover'
import type { ComboboxPopoverValue } from './ComboboxPopover.types'
import type { ComboboxPopoverTargetProps } from './ComboboxPopoverTarget'

export { ComboboxPopover } from './ComboboxPopover'
export { ComboboxPopoverTarget } from './ComboboxPopoverTarget'

export type { ComboboxPopoverTargetProps } from './ComboboxPopoverTarget'
export type { ComboboxPopoverValue } from './ComboboxPopover.types'
export type {
    ComboboxPopoverProps,
    ComboboxPopoverStylesNames,
    ComboboxPopoverFactory,
    ComboboxData,
    ComboboxItem,
    ComboboxItemGroup,
    ComboboxParsedItem,
    ComboboxLikeRenderOptionInput,
    OptionsFilter,
    OptionsFilterInput
} from './ComboboxPopover'

export namespace ComboboxPopover {
    export type Props = ComboboxPopoverProps
    export type StylesNames = ComboboxPopoverStylesNames
    export type Factory = ComboboxPopoverFactory

    export namespace Target {
        export type Props = ComboboxPopoverTargetProps
    }
}
