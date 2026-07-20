import { FiArrowUpRight } from 'react-icons/fi';
import cx from 'clsx';
import { Anchor, AnchorProps } from '@react-ui/ui';
import classes from './HomePageLearnMore.module.css';

interface HomePageLearnMoreProps extends AnchorProps {
  href: string;
}

export function HomePageLearnMore({
  className,
  children,
  href = '/',
  ...others
}: HomePageLearnMoreProps) {
  return (
    <Anchor href={href} className={cx(classes.root, className)} {...others}>
      <span className={classes.inner}>
        {children}
        <FiArrowUpRight size={16} />
      </span>
    </Anchor>
  );
}
