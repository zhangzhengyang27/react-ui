import cx from 'clsx'
import { MantineLoaderComponent } from '../Loader.types'
import classes from '../Loader.module.css'

export const Bars: MantineLoaderComponent = ({ className, ...others }) => (
    <span className={cx(classes.barsLoader, className)} {...others}>
        <span className={classes.bar} />
        <span className={classes.bar} />
        <span className={classes.bar} />
    </span>
)

Bars.displayName = '@react-ui/ui/Bars'
