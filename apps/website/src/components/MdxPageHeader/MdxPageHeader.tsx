import { Box, Title } from '@react-ui/ui';
import { Frontmatter } from '@/types';
import { getComponentChineseName } from '@/components/Shell/DocsNavbar/component-name-translations';
import classes from './MdxPageHeader.module.css';

interface MdxPageHeaderProps {
  meta: Frontmatter;
}

export function MdxPageHeader({ meta }: MdxPageHeaderProps) {
  const withTitle = !!meta.title;

  if (meta.hideHeader || !withTitle) {
    return null;
  }

  const chineseName = getComponentChineseName(meta.title);
  const title = chineseName ? `${meta.title} ${chineseName}` : meta.title;
  const eyebrow = meta.group ?? meta.package ?? '文档';

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <span className={classes.eyebrow}>{eyebrow}</span>
        <Title className={classes.title}>{title}</Title>
        {meta.description && (
          <Box component="p" className={classes.description}>
            {meta.description}
          </Box>
        )}
        {(meta.package || meta.source) && (
          <div className={classes.meta}>
            {meta.package && (
              <span className={classes.metaItem}>
                <span className={classes.metaKey}>package</span>
                <span className={classes.metaVal}>{meta.package}</span>
              </span>
            )}
            {meta.source && (
              <span className={classes.metaItem}>
                <span className={classes.metaKey}>source</span>
                <span className={classes.metaVal}>{meta.source}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
