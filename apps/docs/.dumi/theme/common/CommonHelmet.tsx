import React from 'react';
import { Helmet } from 'dumi';

import { useSharedRouteMeta } from './RouteMetaContext';

const CommonHelmet: React.FC = () => {
  // 共享 RouteMeta（切页卡顿治理 · 修复 4）：避免每个组件各自 matchRoutes 扫全量路由表
  const meta = useSharedRouteMeta();

  const [title, description] = React.useMemo<[string, string]>(() => {
    let helmetTitle: string;
    if (!meta.frontmatter.subtitle && !meta.frontmatter.title) {
      helmetTitle = '404 Not Found - react-ui';
    } else {
      helmetTitle = `${meta.frontmatter.subtitle || ''} ${
        meta.frontmatter?.title || ''
      } - react-ui`;
    }
    const helmetDescription = meta.frontmatter.description || '';
    return [helmetTitle, helmetDescription];
  }, [meta]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default CommonHelmet;
