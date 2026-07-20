import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Button, EmptyState } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { EmptyStateStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Button, EmptyState } from '@react-ui/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

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
`;

function Demo(props: any) {
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
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: EmptyStateStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 440,
};
