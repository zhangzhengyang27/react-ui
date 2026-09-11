import type { PropsWithChildren } from 'react';
import React from 'react';
import { FormattedMessage } from 'dumi';
import { Title } from '@xiaoye-react/ui';

import CommonHelmet from '../../common/CommonHelmet';
import EditButton from '../../common/EditButton';
import { useSharedRouteMeta } from '../../common/RouteMetaContext';
import Footer from '../../slots/Footer';
import AffixTabs from './AffixTabs';
import styles from './ResourceLayout.module.css';

export type ResourceLayoutProps = PropsWithChildren<NonNullable<any>>;

const ResourceLayout: React.FC<ResourceLayoutProps> = ({ children }) => {
  // 共享 RouteMeta（切页卡顿治理 · 修复 4）
  const meta = useSharedRouteMeta();
  const node = (
    <div>
      <CommonHelmet />
      <div id="resources-page" className={styles.resourcePage}>
        <AffixTabs />
        <div className={styles.banner}>
          <Title order={1} style={{ fontSize: 30 }}>
            {meta.frontmatter?.title}
            <EditButton
              title={<FormattedMessage id="app.content.edit-page" />}
              filename={meta.frontmatter.filename}
            />
          </Title>
          <section>{meta.frontmatter.description}</section>
        </div>
        <div className={styles.resourceContent}>{children}</div>
        <Footer />
      </div>
    </div>
  );

  return node;
};

export default ResourceLayout;
