import { Button, ComboboxPopover, Group } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button, ComboboxPopover, Group } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();

  return (
    <Group>
      <Button onClick={toggle}>Toggle dropdown</Button>
      <ComboboxPopover
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      >
        <ComboboxPopover.Target>
          <Button variant="default" miw={200}>Select framework</Button>
        </ComboboxPopover.Target>
      </ComboboxPopover>
    </Group>
  );
}
`;

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();

  return (
    <Group>
      <Button onClick={toggle}>Toggle dropdown</Button>
      <ComboboxPopover data={['React', 'Angular', 'Vue', 'Svelte']} dropdownOpened={dropdownOpened}>
        <ComboboxPopover.Target>
          <Button variant="default" miw={200}>
            Select framework
          </Button>
        </ComboboxPopover.Target>
      </ComboboxPopover>
    </Group>
  );
}

export const dropdownOpened: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
