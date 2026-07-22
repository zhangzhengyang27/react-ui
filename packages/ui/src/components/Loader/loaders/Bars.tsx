import cx from 'clsx'
import { UILoaderComponent } from '../Loader.types'
import classes from '../Loader.module.css'

export const Bars: UILoaderComponent = ({ className, ...others }) => (
    <span className={cx(classes.barsLoader, className)} {...others}>
        <span className={classes.bar} />
        <span className={classes.bar} />
        <span className={classes.bar} />
    </span>
)

Bars.displayName = '@xiaoye-react/ui/Bars'
