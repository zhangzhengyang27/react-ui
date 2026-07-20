import cx from 'clsx';
import { Text, TextProps } from '@react-ui/ui';
import classes from './HomePageDescription.module.css';

interface HomePageDescriptionProps extends TextProps {}

export function HomePageDescription({ className, ...others }: HomePageDescriptionProps) {
  return <Text className={cx(classes.root, className)} {...others} />;
}
