import { Pill, TagsInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TagsInput, Pill } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
      label="自定义标签丸"
      description="标签以星号前缀渲染"
      placeholder="输入标签"
      defaultValue={['React', 'Angular']}
      renderPill={({ value, onRemove }) => (
        <Pill withRemoveButton onRemove={onRemove}>
          ★ {value}
        </Pill>
      )}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="自定义标签丸"
      description="标签以星号前缀渲染"
      placeholder="输入标签"
      defaultValue={['React', 'Angular']}
      renderPill={({ value, onRemove }) => (
        <Pill withRemoveButton onRemove={onRemove}>
          ★ {value}
        </Pill>
      )}
    />
  );
}

export const renderPill: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
};
