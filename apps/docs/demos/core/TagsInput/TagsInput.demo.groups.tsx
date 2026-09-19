import { TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TagsInput
      label="输入标签"
      placeholder="输入标签"
      data={[
        { value: 'React', group: 'Frontend' },
        { value: 'Angular', group: 'Frontend' },
        { value: 'Express', group: 'Backend' },
        { value: 'Django', group: 'Backend' }
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="输入标签"
      placeholder="输入标签"
      data={[
        { value: 'React', group: 'Frontend' },
        { value: 'Angular', group: 'Frontend' },
        { value: 'Express', group: 'Backend' },
        { value: 'Django', group: 'Backend' }
      ]}
    />
  );
}

export const groups: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
