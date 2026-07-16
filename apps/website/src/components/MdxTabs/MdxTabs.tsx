import { MdxSiblings } from '@/components/MdxSiblings';
import { MdxTitle } from '@/components/MdxProvider';
import { PageBase } from '@/components/PageBase';
import { PropsTablesList } from '@/components/PropsTable';
import { StylesApiTablesList } from '@/components/StylesApiTable';
import { TableOfContents } from '@/components/TableOfContents';
import { Frontmatter } from '@/types';
import classes from './MdxTabs.module.css';

interface MdxTabsProps {
  children: React.ReactNode;
  meta: Frontmatter;
}

export function MdxTabs({ children, meta }: MdxTabsProps) {
  const hasProps = Array.isArray(meta.props);
  const hasStyles = Array.isArray(meta.styles);

  if (!hasProps && !hasStyles) {
    return null;
  }

  return (
    <PageBase>
      <div className={classes.wrapper}>
        <div className={classes.container} id="mdx">
          {children}

          {hasProps && (
            <>
              <MdxTitle order={2} id="props">
                属性
              </MdxTitle>
              <PropsTablesList
                components={meta.props!}
                componentPrefix={meta.componentPrefix}
              />
            </>
          )}

          {hasStyles && (
            <StylesApiTablesList
              components={meta.styles!}
              componentPrefix={meta.componentPrefix}
            />
          )}

          <MdxSiblings meta={meta} />
        </div>

        <div className={classes.tableOfContents}>
          <TableOfContents withTabs={false} />
        </div>
      </div>
    </PageBase>
  );
}
