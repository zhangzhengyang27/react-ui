/* oxlint-disable no-console */

import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText'
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge'
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import Fuse from 'fuse.js'
import { SpotlightActionData, SpotlightFilterFunction } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { SpotlightDemoBase } from './_demo-base'

const actions: SpotlightActionData[] = [
    {
        id: 'home',
        label: '首页',
        description: '前往首页',
        onClick: () => console.log('首页'),
        leftSection: <HouseIcon size={24} />
    },
    {
        id: 'dashboard',
        label: '仪表盘',
        description: '获取当前系统状态的完整信息',
        onClick: () => console.log('仪表盘'),
        leftSection: <GaugeIcon size={24} />
    },
    {
        id: 'documentation',
        label: '文档',
        description: '访问文档以了解更多功能',
        onClick: () => console.log('文档'),
        leftSection: <FileTextIcon size={24} />
    },
    {
        id: 'settings',
        label: '设置',
        description: '管理应用偏好和配置',
        onClick: () => console.log('设置'),
        leftSection: <HouseIcon size={24} />
    }
]

const fuzzySearchFilter: SpotlightFilterFunction = (query, searchActions) => {
    if (!query.trim()) {
        return searchActions
    }

    const flatActions = searchActions.reduce<any[]>((acc, item) => {
        if ('actions' in item) {
            return [...acc, ...item.actions.map(action => ({ ...action, group: item.group }))]
        }
        return [...acc, item]
    }, [])

    const fuse = new Fuse(flatActions, {
        keys: ['label', 'description'],
        threshold: 0.3,
        minMatchCharLength: 1
    })

    const results = fuse.search(query).map(result => result.item)

    const groups: Record<string, any> = {}
    const result: any[] = []

    results.forEach(action => {
        if (action.group) {
            if (!groups[action.group]) {
                groups[action.group] = { pushed: false, data: { group: action.group, actions: [] } }
            }
            groups[action.group].data.actions.push(action)
            if (!groups[action.group].pushed) {
                groups[action.group].pushed = true
                result.push(groups[action.group].data)
            }
        } else {
            result.push(action)
        }
    })

    return result
}

const code = `
import Fuse from 'fuse.js';
import { Button } from '@xiaoye-react/ui';
import {
  Spotlight,
  SpotlightActionData,
  SpotlightFilterFunction,
  spotlight,
} from '@xiaoye-react/ui';
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House';
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge';
import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
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
  {
    id: 'settings',
    label: '设置',
    description: '管理应用偏好和配置',
    onClick: () => console.log('设置'),
    leftSection: <HouseIcon size={24} />,
  },
];

const fuzzySearchFilter: SpotlightFilterFunction = (query, searchActions) => {
  if (!query.trim()) {
    return searchActions;
  }

  const flatActions = searchActions.reduce<any[]>((acc, item) => {
    if ('actions' in item) {
      return [...acc, ...item.actions.map((action) => ({ ...action, group: item.group }))];
    }
    return [...acc, item];
  }, []);

  const fuse = new Fuse(flatActions, {
    keys: ['label', 'description'],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  const results = fuse.search(query).map((result) => result.item);

  const groups: Record<string, any> = {};
  const result: any[] = [];

  results.forEach((action) => {
    if (action.group) {
      if (!groups[action.group]) {
        groups[action.group] = { pushed: false, data: { group: action.group, actions: [] } };
      }
      groups[action.group].data.actions.push(action);
      if (!groups[action.group].pushed) {
        groups[action.group].pushed = true;
        result.push(groups[action.group].data);
      }
    } else {
      result.push(action);
    }
  });

  return result;
};

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>打开聚光灯</Button>
      <Spotlight
        actions={actions}
        filter={fuzzySearchFilter}
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
`

function Demo() {
    return (
        <SpotlightDemoBase
            actions={actions}
            filter={fuzzySearchFilter}
            nothingFound="未找到..."
            highlightQuery
            shortcut={null}
            searchProps={{
                leftSection: <MagnifyingGlassIcon size={20} />,
                placeholder: '搜索...'
            }}
        />
    )
}

export const fuzzySearch: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
