import { Pill, TagsInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TagsInput, Pill } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
      label="Custom pills"
      description="Tags are rendered with a star prefix"
      placeholder="Enter tag"
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
      label="Custom pills"
      description="Tags are rendered with a star prefix"
      placeholder="Enter tag"
      defaultValue={['React', 'Angular']}
      renderPill={({ value, onRemove }) => (
        <Pill withRemoveButton onRemove={onRemove}>
          ★ {value}
        </Pill>
      )}
    />
  );
}

export const renderPill: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
};
