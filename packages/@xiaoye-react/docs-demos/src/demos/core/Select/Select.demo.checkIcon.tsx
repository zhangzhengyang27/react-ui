import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Select
      {{props}}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      pb={150}
      label="控制勾选图标"
      placeholder="选择值"
      defaultValue="React"
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <Select
      {...props}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      pb={150}
      label="控制勾选图标"
      placeholder="选择值"
      defaultValue="React"
      comboboxProps={{ hideDetached: false }}
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
    { type: 'boolean', prop: 'withCheckIcon', initialValue: true, libraryValue: true },
    { type: 'boolean', prop: 'withAlignedLabels', initialValue: false, libraryValue: false },
    {
      type: 'segmented',
      prop: 'checkIconPosition',
      initialValue: 'left',
      libraryValue: null,
      data: ['left', 'right'],
    },
  ],
};
