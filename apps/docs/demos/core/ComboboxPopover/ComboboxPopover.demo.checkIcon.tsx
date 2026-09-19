import { Button, ComboboxPopover } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, ComboboxPopover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ComboboxPopover
      {{props}}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      defaultValue="React"
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200} mb={150}>选择框架</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ComboboxPopover
      {...props}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      defaultValue="React"
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200} mb={150}>
          Select framework
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
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
