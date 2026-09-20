import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { EmptyState, EmptyStateProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

function Wrapper(props: EmptyStateProps) {
    return (
        <EmptyState
            icon={<MagnifyingGlassIcon />}
            title="未找到结果"
            description="未找到与搜索匹配的内容。请尝试调整筛选条件或使用不同的关键词以查看更多结果。"
            {...props}
        />
    )
}

const code = `
import { EmptyState } from '@xiaoye-react/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
function Demo() {
  return (
    <EmptyState
      icon={<MagnifyingGlassIcon />}
      title="未找到结果"
      description="未找到与搜索匹配的内容。请尝试调整筛选条件或使用不同的关键词以查看更多结果。"{{props}}
    />
  );
}
`

export const variant: UIDemo = {
    type: 'configurator',
    component: Wrapper,
    code,
    centered: true,
    maxWidth: 420,
    controls: [
        {
            prop: 'variant',
            type: 'segmented',
            data: [
                { value: 'filled', label: '填充' },
                { value: 'light', label: '浅色' }
            ],
            initialValue: 'light',
            libraryValue: 'light'
        },
        { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: null }
    ]
}
