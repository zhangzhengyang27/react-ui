import { Input } from '../Input/Input'
import { useMenuContext } from './Menu.context'
import classes from './Menu.module.css'

export interface MenuSearchProps extends React.ComponentProps<typeof Input> {
    /** If set, clears the search value after the menu closes @default true */
    clearSearchOnClose?: boolean
}

export function MenuSearch(props: MenuSearchProps) {
    const ctx = useMenuContext()
    const { clearSearchOnClose, ...others } = props

    return (
        <Input
            data-autofocus
            data-mantine-stop-propagation
            type="search"
            {...others}
            __staticSelector="Menu"
        />
    )
}

MenuSearch.displayName = '@react-ui/ui/MenuSearch'
