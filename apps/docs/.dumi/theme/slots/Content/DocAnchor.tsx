import React from 'react';
import { Anchor, Text } from '@xiaoye-react/ui';
import { clsx } from 'clsx';
import { useTabMeta } from 'dumi';

import { useSharedRouteMeta } from '../../common/RouteMetaContext';

import classes from './DocAnchor.module.css';

interface DocAnchorProps {
  showDebug?: boolean;
  debugDemos?: string[];
}

interface AnchorItem {
  id: string;
  title: string;
  children?: AnchorItem[];
}

const HEADER_OFFSET = 100;

const DocAnchor: React.FC<DocAnchorProps> = ({ showDebug, debugDemos = [] }) => {
  // 共享 RouteMeta（切页卡顿治理 · 修复 4）
  const meta = useSharedRouteMeta();
  const tab = useTabMeta();

  const anchorItems = React.useMemo<AnchorItem[]>(
    () =>
      (tab?.toc || meta.toc).reduce<AnchorItem[]>((result, item) => {
        if (item.depth === 2) {
          result.push({ ...item });
        } else if (item.depth === 3) {
          const parent = result[result.length - 1];
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push({ ...item });
          }
        }
        return result;
      }, []),
    [tab?.toc, meta.toc],
  );

  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    if (!anchorItems.length) {
      return;
    }

    const handler = () => {
      let current = '';
      for (const item of anchorItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= HEADER_OFFSET) {
          current = item.id;
        }
        for (const child of item.children || []) {
          const childEl = document.getElementById(child.id);
          if (childEl && childEl.getBoundingClientRect().top <= HEADER_OFFSET) {
            current = child.id;
          }
        }
      }
      setActiveId(current);
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [anchorItems]);

  if (!meta.frontmatter.toc) {
    return null;
  }

  return (
    <section className={classes.tocWrapper}>
      <div className={classes.anchorToc}>
        {anchorItems.map((item) => (
          <div key={item.id} className={classes.anchorGroup}>
            <Anchor
              href={`#${item.id}`}
              className={clsx(classes.anchorLink, classes.anchorLinkParent, {
                [classes.anchorLinkActive]: activeId === item.id,
              })}
            >
              {item.title}
            </Anchor>
            {item.children
              ?.filter((child) => showDebug || !debugDemos.includes(child.id))
              .map((child) => (
                <Anchor
                  key={child.id}
                  href={`#${child.id}`}
                  className={clsx(classes.anchorLink, classes.anchorLinkChild, {
                    [classes.anchorLinkDebug]: debugDemos.includes(child.id),
                    [classes.anchorLinkActive]: activeId === child.id,
                  })}
                >
                  <Text size="sm" span inherit>
                    {child.title}
                  </Text>
                </Anchor>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DocAnchor;
