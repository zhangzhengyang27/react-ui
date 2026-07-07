import cx from 'clsx'
import { MantineLoaderComponent } from '../Loader.types'
import classes from '../Loader.module.css'

export const Dots: MantineLoaderComponent = ({ className, ...others }) => (
    <span className={cx(classes.dotsLoader, className)} {...others}>
        <span className={classes.dot} />
        <span className={classes.dot} />
        <span className={classes.dot} />
    </span>
)

Dots.displayName = '@react-ui/ui/Dots'
