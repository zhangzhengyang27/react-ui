export type ComboboxPopoverValue<
    Multiple extends boolean,
    Value extends string = string
> = Multiple extends true ? Value[] : Value | null
