import { Button, ComboboxPopover, Group } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, ComboboxPopover, Group } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();

  return (
    <Group>
      <Button onClick={toggle}>切换下拉</Button>
      <ComboboxPopover
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      >
        <ComboboxPopover.Target>
          <Button variant="default" miw={200}>选择框架</Button>
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
      <Button onClick={toggle}>切换下拉</Button>
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

export const dropdownOpened: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
