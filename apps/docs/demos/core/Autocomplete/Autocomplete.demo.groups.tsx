import { Autocomplete } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Autocomplete } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Autocomplete
      label="你最喜欢的库"
      placeholder="选择值或输入任意内容"
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
    <Autocomplete
      label="你最喜欢的库"
      placeholder="选择值或输入任意内容"
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
