import cx from 'clsx'
import { UILoaderComponent } from '../Loader.types'
import classes from '../Loader.module.css'

export const Oval: UILoaderComponent = ({ className, ...others }) => (
    <span className={cx(classes.ovalLoader, className)} {...others} />
)

Oval.displayName = '@xiaoye-react/ui/Oval'
