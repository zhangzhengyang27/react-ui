/* oxlint-disable no-console */

import { FileTextIcon, GaugeIcon, HouseIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { SpotlightActionData } from '@react-ui/spotlight';
import { UIDemo } from '@react-ui/demo';
import { SpotlightDemoBase } from './_demo-base';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: '首页',
    description: '前往首页',
    onClick: () => console.log('首页'),
    leftSection: <HouseIcon size={24} />,
  },
  {
    id: 'dashboard',
    label: '仪表盘',
    description: '获取当前系统状态的完整信息',
    onClick: () => console.log('仪表盘'),
    leftSection: <GaugeIcon size={24} />,
  },
  {
    id: 'documentation',
    label: '文档',
    description: '访问文档以了解更多功能',
    onClick: () => console.log('文档'),
    leftSection: <FileTextIcon size={24} />,
  },
];

const code = `
import { Button } from '@react-ui/ui';
import { Spotlight, SpotlightActionData, spotlight } from '@react-ui/spotlight';
import { HouseIcon, GaugeIcon, FileTextIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: '首页',
    description: '前往首页',
    onClick: () => console.log('首页'),
    leftSection: <HouseIcon size={24} />,
  },
  {
    id: 'dashboard',
    label: '仪表盘',
    description: '获取当前系统状态的完整信息',
    onClick: () => console.log('仪表盘'),
    leftSection: <GaugeIcon size={24} />,
  },
  {
    id: 'documentation',
    label: '文档',
    description: '访问文档以了解更多功能',
    onClick: () => console.log('文档'),
    leftSection: <FileTextIcon size={24} />,
  },
];

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>打开聚光灯</Button>
      <Spotlight
        actions={actions}
        nothingFound="未找到..."
        highlightQuery
        searchProps={{
          leftSection: <MagnifyingGlassIcon size={20} />,
          placeholder: '搜索...',
        }}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <SpotlightDemoBase
      actions={actions}
      nothingFound="未找到..."
      highlightQuery
      shortcut={null}
      searchProps={{
        leftSection: <MagnifyingGlassIcon size={20} />,
        placeholder: '搜索...',
      }}
    />
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
