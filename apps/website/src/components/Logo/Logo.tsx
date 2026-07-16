import Link from 'next/link';
import cx from 'clsx';
import { FOCUS_CLASS_NAMES, VisuallyHidden } from '@react-ui/ui';
import { ReactUILogo, ReactUILogoProps } from '@react-ui/logo';
import classes from './Logo.module.css';

export function Logo(props: ReactUILogoProps) {
  return (
    <Link href="/" className={cx(classes.logo, FOCUS_CLASS_NAMES.auto)} aria-label="ReactUI">
      <VisuallyHidden>
        ReactUI — React 组件与 Hooks 库
      </VisuallyHidden>
      <ReactUILogo size={30} {...props} />
    </Link>
  );
}
