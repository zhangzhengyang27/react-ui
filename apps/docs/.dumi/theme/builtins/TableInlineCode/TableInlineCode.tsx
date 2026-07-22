import cx from 'clsx';
import { Text, TextProps } from '@xiaoye-react/ui';
import classes from './TableInlineCode.module.css';

interface TableInlineCodeProps extends TextProps {}

export function TableInlineCode({ className, ...others }: TableInlineCodeProps) {
  return <Text component="span" className={cx(classes.code, className)} {...others} />;
}
