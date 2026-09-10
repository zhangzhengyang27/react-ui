import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { Button, EmptyState } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

function Wrapper(props: any) {
    return (
        <EmptyState
            icon={<MagnifyingGlassIcon />}
            title="未找到结果"
            description="未找到与搜索匹配的内容。请尝试调整筛选条件或使用不同的关键词以查看更多结果。"
            {...props}
        >
            <EmptyState.Actions>
                <Button variant="default">重置筛选</Button>
            </EmptyState.Actions>
        </EmptyState>
    )
}

const code = `
import { Button, EmptyState } from '@xiaoye-react/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
function Demo() {
  return (
    <EmptyState
      icon={<MagnifyingGlassIcon />}
      title="未找到结果"
      description="未找到与搜索匹配的内容。请尝试调整筛选条件或使用不同的关键词以查看更多结果。"{{props}}
    >
      <EmptyState.Actions>
        <Button variant="default">重置筛选</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}
`

export const usage: UIDemo = {
    type: 'configurator',
    component: Wrapper,
    code,
    centered: true,
    maxWidth: 420,
    controls: [
        { prop: 'size', type: 'size', libraryValue: 'md', initialValue: 'md' },
        {
            prop: 'align',
            type: 'segmented',
            data: [
                { value: 'center', label: '居中' },
                { value: 'left', label: '左' },
                { value: 'right', label: '右' }
            ],
            initialValue: 'center',
            libraryValue: 'center'
        },
        {
            prop: 'withIndicatorBackground',
            type: 'boolean',
            libraryValue: false,
            initialValue: false
        }
    ]
}
