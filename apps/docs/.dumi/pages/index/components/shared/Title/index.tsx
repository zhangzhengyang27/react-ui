import cx from 'clsx';
import { Title, TitleProps } from '@xiaoye-react/ui';
import classes from './HomePageTitle.module.css';

export function HomePageTitle({ className, ...others }: TitleProps) {
  return <Title className={cx(classes.title, className)} {...others} />;
}
