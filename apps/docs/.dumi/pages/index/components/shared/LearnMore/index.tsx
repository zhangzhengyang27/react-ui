import { FiArrowUpRight } from 'react-icons/fi';
import cx from 'clsx';
import { useLocation } from 'dumi';
import Link from '../../../../../theme/common/Link';
import * as utils from '../../../../../theme/utils';
import classes from './HomePageLearnMore.module.css';

interface HomePageLearnMoreProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function HomePageLearnMore({
  className,
  children,
  href = '/',
  ...others
}: HomePageLearnMoreProps) {
  const { pathname, search } = useLocation();
  const localized = utils.getLocalizedPathname(href, utils.isZhCN(pathname), search);

  return (
    <Link href={localized} className={cx(classes.root, className)} {...others}>
      <span className={classes.inner}>
        {children}
        <FiArrowUpRight size={16} />
      </span>
    </Link>
  );
}
