import type { FC, ReactNode } from 'react';
import React from 'react';
import { AiOutlineCode, AiOutlineSkin } from 'react-icons/ai';
import { Tabs } from '@xiaoye-react/ui';
import { useRouteMeta } from 'dumi';
import type { IContentTabsProps } from 'dumi/theme-default/slots/ContentTabs';

import useLocale from '../../../hooks/useLocale';

const iconMap: Record<string, ReactNode> = {
  design: <AiOutlineSkin />,
};

const locales = {
  cn: {
    development: '开发',
    design: '设计',
  },
  en: {
    development: 'Development',
    design: 'Design',
  },
};

const ContentTabs: FC<IContentTabsProps> = ({ tabs, tabKey, onChange }) => {
  const meta = useRouteMeta();

  const [locale] = useLocale(locales);

  const titleMap: Record<string, ReactNode> = {
    design: locale.design,
  };

  if (!meta.tabs) {
    return null;
  }

  const developmentTab = (
    <Tabs.Tab key="development" value="development" leftSection={<AiOutlineCode />}>
      {locale.development}
    </Tabs.Tab>
  );

  const extraTabs = (tabs || []).map((tab) => (
    <Tabs.Tab key={tab.key} value={tab.key} leftSection={iconMap[tab.key]}>
      {titleMap[tab.key]}
    </Tabs.Tab>
  ));

  return (
    <Tabs
      value={tabKey || 'development'}
      onChange={(key) => onChange(tabs?.find((tab) => tab.key === key))}
      style={{ margin: '32px 0 -16px' }}
    >
      <Tabs.List>
        {developmentTab}
        {extraTabs}
      </Tabs.List>
    </Tabs>
  );
};

export default ContentTabs;
