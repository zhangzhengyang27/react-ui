import cx from 'clsx'
import { MantineLoaderComponent } from '../Loader.types'
import classes from '../Loader.module.css'

export const Oval: MantineLoaderComponent = ({ className, ...others }) => (
    <span className={cx(classes.ovalLoader, className)} {...others} />
)

Oval.displayName = '@react-ui/ui/Oval'
