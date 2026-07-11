import Link from 'next/link';
import { Anchor } from '@react-ui/ui';
import classes from './MdxLink.module.css';

export function MdxLink({ href, ...others }: React.ComponentProps<'a'>) {
  const replaced = href?.replace('https://react-ui.dev', '');

  if (replaced && !replaced?.startsWith('http') && replaced.trim().length > 0) {
    return <Anchor className={classes.link} component={Link} href={replaced} {...others} />;
  }

  return <Anchor className={classes.link} href={href} {...others} />;
}
