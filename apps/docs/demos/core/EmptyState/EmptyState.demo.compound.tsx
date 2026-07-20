import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Button, EmptyState } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Demo() {
  return (
    <EmptyState>
      <EmptyState.Indicator>
        <MagnifyingGlassIcon />
      </EmptyState.Indicator>
      <EmptyState.Title>未找到结果</EmptyState.Title>
      <EmptyState.Description>
        We couldn't find anything matching your search. Try adjusting your filters or searching with
        different keywords to see more results.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="default">重置筛选</Button>
        <Button variant="default">新建</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}

const code = `
import { Button, EmptyState } from '@react-ui/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <EmptyState>
      <EmptyState.Indicator>
        <MagnifyingGlassIcon />
      </EmptyState.Indicator>
      <EmptyState.Title>未找到结果</EmptyState.Title>
      <EmptyState.Description>
        We couldn't find anything matching your search. Try adjusting your filters or searching with
        different keywords to see more results.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="default">重置筛选</Button>
        <Button variant="default">新建</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}
`;

export const compound: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 440,
};
