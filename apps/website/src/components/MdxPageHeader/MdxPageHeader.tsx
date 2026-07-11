import { Title } from '@react-ui/ui';
import { Frontmatter } from '@/types';
import classes from './MdxPageHeader.module.css';

interface MdxPageHeaderProps {
  meta: Frontmatter;
}

export function MdxPageHeader({ meta }: MdxPageHeaderProps) {
  const withTabs = Array.isArray(meta.props);
  const withTitle = !!meta.title;

  if (meta.hideHeader || !withTitle) {
    return null;
  }

  return (
    <div className={classes.wrapper} data-with-tabs={withTabs || undefined}>
      <div className={classes.header} data-with-tabs={withTabs || undefined}>
        <Title className={classes.title}>{meta.title}</Title>
      </div>
    </div>
  );
}
