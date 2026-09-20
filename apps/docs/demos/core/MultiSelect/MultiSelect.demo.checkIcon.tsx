import { MultiSelect, MultiSelectProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MultiSelect } from '@xiaoye-react/ui';


function Demo() {
  return (
    <MultiSelect
      {{props}}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      pb={150}
      label="控制勾选图标"
      placeholder="选择值"
      defaultValue={["React"]}
    />
  );
}
`;

function Wrapper(props: MultiSelectProps) {
  return (
    <MultiSelect
      {...props}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      pb={150}
      label="控制勾选图标"
      placeholder="选择值"
      defaultValue={['React']}
    />
  );
}

export const checkIcon: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: [
    {
      type: 'segmented',
      prop: 'checkIconPosition',
      initialValue: 'left',
      libraryValue: null,
      data: ['left', 'right'],
    },
  ],
};
