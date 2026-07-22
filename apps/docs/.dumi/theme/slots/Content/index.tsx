import React, { Suspense, useLayoutEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { FormattedMessage, useLocation as useDumiLocation, useRouteMeta } from 'dumi';
import { Flex, Group, Skeleton, Title } from '@xiaoye-react/ui';

import useLayoutState from '../../../hooks/useLayoutState';
import useLocation from '../../../hooks/useLocation';
import ComponentMeta from '../../builtins/ComponentMeta';
import EditButton from '../../common/EditButton';
import PrevAndNext from '../../common/PrevAndNext';
import type { DemoContextProps } from '../DemoContext';
import DemoContext from '../DemoContext';
import Footer from '../Footer';
import SiteContext from '../SiteContext';

import BackToTop from './BackToTop';
import Contributors from './Contributors';
import DocAnchor from './DocAnchor';
import DocMeta from './DocMeta';

import classes from './Content.module.css';

const AvatarPlaceholder: React.FC<{ num?: number }> = ({ num = 6 }) =>
  Array.from({ length: num }).map<React.ReactNode>((_, i) => (
    <Skeleton
      circle
      height={24}
      key={i}
      style={{ marginInlineStart: i === 0 ? 0 : -8 }}
    />
  ));

export interface ContentProps {
  children?: React.ReactNode;
  className?: string;
}

const Content: React.FC<ContentProps> = ({ children, className }) => {
  const meta = useRouteMeta();
  const rawLocation = useDumiLocation();
  const { pathname, hash } = useLocation();
  const { direction } = React.use(SiteContext);

  const [showDebug, setShowDebug] = useLayoutState(false);
  const [codeType, setCodeType] = useState('tsx');

  const debugDemos = useMemo(
    () => meta.toc?.filter((item) => item._debug_demo).map((item) => item.id) || [],
    [meta],
  );

  const isDebugDemo = debugDemos.includes(hash.slice(1));

  useLayoutEffect(() => {
    setShowDebug(process.env.NODE_ENV === 'development' || isDebugDemo);
  }, [isDebugDemo]);

  const contextValue = useMemo<DemoContextProps>(
    () => ({ showDebug, setShowDebug, codeType, setCodeType }),
    [showDebug, codeType],
  );

  const isRTL = direction === 'rtl';
  const isComponentPage = pathname.startsWith('/components/');
  const markdownPath =
    !isComponentPage && meta.frontmatter?.filename
      ? `${rawLocation.pathname.replace(/\/$/, '') || '/index'}.md`
      : undefined;
  const showComponentMeta =
    meta.frontmatter.category === 'Components' && String(meta.frontmatter.showImport) !== 'false';
  const showDocsMeta = meta.frontmatter.category !== 'Components' && markdownPath;
  const showTitleEdit =
    !pathname.startsWith('/components/overview') && !showComponentMeta && !showDocsMeta;

  return (
    <DemoContext value={contextValue}>
      <div className={clsx(classes.col, className)}>
        <DocAnchor showDebug={showDebug} debugDemos={debugDemos} />
        <article className={clsx(classes.articleWrapper, { rtl: isRTL })}>
          {meta.frontmatter?.title ? (
            <Flex justify="space-between">
              <Title order={1} style={{ fontSize: 32, position: 'relative' }}>
                <Group gap="sm">
                  <span>{meta.frontmatter?.title}</span>
                  <span>{meta.frontmatter?.subtitle}</span>
                  {showTitleEdit && (
                    <EditButton
                      title={<FormattedMessage id="app.content.edit-page" />}
                      filename={meta.frontmatter.filename}
                    />
                  )}
                </Group>
              </Title>
            </Flex>
          ) : null}
          <DocMeta />
          {!meta.frontmatter.__autoDescription && meta.frontmatter.description}

          {/* Import Info */}
          {showComponentMeta && (
            <ComponentMeta
              source
              component={meta.frontmatter.title}
              filename={meta.frontmatter.filename}
              version={meta.frontmatter.tag}
              designUrl={meta.frontmatter.designUrl}
              searchTitleKeywords={[meta.frontmatter.title, meta.frontmatter.subtitle].filter(
                Boolean,
              )}
              repo="xiaoye/react-ui"
            />
          )}
          {showDocsMeta && (
            <ComponentMeta
              filename={meta.frontmatter.filename}
              llmsPath={markdownPath}
              repo="xiaoye/react-ui"
              showChangelog={false}
              showImport={false}
            />
          )}
          <div style={{ minHeight: 'calc(100vh - 64px)' }}>
            {children}
            <BackToTop />
          </div>
          <div style={{ marginTop: 120 }}>
            <Suspense fallback={<AvatarPlaceholder />}>
              <Contributors filename={meta.frontmatter.filename} />
            </Suspense>
          </div>
        </article>
        <PrevAndNext rtl={isRTL} />
        <Footer />
      </div>
    </DemoContext>
  );
};

export default Content;
