import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { SpotlightActionData, SpotlightActionGroupData } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { SpotlightDemoBase } from './_demo-base'

const code = `
import { Button } from '@xiaoye-react/ui';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from '@xiaoye-react/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
  {
    group: '页面',
    actions: [
      { id: 'home', label: '首页', description: '我们展示产品的地方' },
      { id: 'careers', label: '招聘页', description: '我们列出空缺职位的地方' },
      { id: 'about-us', label: '关于我们页', description: '我们介绍业务的地方' },
    ],
  },

  {
    group: '应用',
    actions: [
      { id: 'svg-compressor', label: 'SVG 压缩器', description: '压缩 SVG 图片' },
      { id: 'base64', label: 'Base 64 转换器', description: '将数据转换为 base 64 格式' },
      { id: 'fake-data', label: '假数据生成器', description: 'Lorem ipsum 生成器' },
    ],
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
`

const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
    {
        group: '页面',
        actions: [
            { id: 'home', label: '首页', description: '我们展示产品的地方' },
            { id: 'careers', label: '招聘页', description: '我们列出空缺职位的地方' },
            { id: 'about-us', label: '关于我们页', description: '我们介绍业务的地方' }
        ]
    },

    {
        group: '应用',
        actions: [
            { id: 'svg-compressor', label: 'SVG 压缩器', description: '压缩 SVG 图片' },
            { id: 'base64', label: 'Base 64 转换器', description: '将数据转换为 base 64 格式' },
            { id: 'fake-data', label: '假数据生成器', description: 'Lorem ipsum 生成器' }
        ]
    }
]

function Demo() {
    return (
        <SpotlightDemoBase
            actions={actions}
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

export const groups: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
