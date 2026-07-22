import cx from 'clsx'
import { UILoaderComponent } from '../Loader.types'
import classes from '../Loader.module.css'

export const Dots: UILoaderComponent = ({ className, ...others }) => (
    <span className={cx(classes.dotsLoader, className)} {...others}>
        <span className={classes.dot} />
        <span className={classes.dot} />
        <span className={classes.dot} />
    </span>
)

Dots.displayName = '@xiaoye-react/ui/Dots'
