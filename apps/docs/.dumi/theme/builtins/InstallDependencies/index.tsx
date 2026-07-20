import React from 'react';
import { Tabs } from '@react-ui/ui';
import SourceCode from 'dumi/theme-default/builtins/SourceCode';

import BunLogo from './bun';
import NpmLogo from './npm';
import PnpmLogo from './pnpm';
import YarnLogo from './yarn';

interface InstallProps {
  npm?: string;
  yarn?: string;
  pnpm?: string;
  bun?: string;
}

const InstallDependencies: React.FC<InstallProps> = (props) => {
  const { npm, yarn, pnpm, bun } = props;

  const tabs: { key: string; label: string; children: React.ReactNode; icon: React.ReactNode }[] = [
    {
      key: 'npm',
      label: 'npm',
      children: npm ? <SourceCode lang="bash">{npm}</SourceCode> : null,
      icon: <NpmLogo />,
    },
    {
      key: 'yarn',
      label: 'yarn',
      children: yarn ? <SourceCode lang="bash">{yarn}</SourceCode> : null,
      icon: <YarnLogo />,
    },
    {
      key: 'pnpm',
      label: 'pnpm',
      children: pnpm ? <SourceCode lang="bash">{pnpm}</SourceCode> : null,
      icon: <PnpmLogo />,
    },
    {
      key: 'bun',
      label: 'Bun',
      children: bun ? <SourceCode lang="bash">{bun}</SourceCode> : null,
      icon: <BunLogo />,
    },
  ].filter((item) => item.children);

  if (!tabs.length) {
    return null;
  }

  return (
    <Tabs defaultValue={tabs[0].key} className="markdown" size="sm">
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.key} value={tab.key} leftSection={tab.icon}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.key} value={tab.key}>
          {tab.children}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default InstallDependencies;
