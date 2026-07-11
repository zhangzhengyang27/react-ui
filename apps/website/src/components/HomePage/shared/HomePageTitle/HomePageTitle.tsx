import cx from 'clsx';
import { Title, TitleProps } from '@react-ui/ui';
import classes from './HomePageTitle.module.css';

export function HomePageTitle({ className, ...others }: TitleProps) {
  return <Title className={cx(classes.title, className)} {...others} />;
}
