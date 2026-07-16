import { Button, ComboboxPopover } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, ComboboxPopover } from '@react-ui/ui';

function Demo() {
  return (
    <ComboboxPopover
      data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'svelte', label: 'Svelte', disabled: true },
      ]}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>选择框架</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  return (
    <ComboboxPopover
      data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'svelte', label: 'Svelte', disabled: true },
      ]}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Select framework
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const disabledOptions: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
