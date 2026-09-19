import { useState } from 'react';
import { Box, Button, CheckIcon, Combobox, Group, Text, useCombobox } from '@xiaoye-react/ui';

const groceries = [
  '🍎 苹果',
  '🍌 香蕉',
  '🥦 西兰花',
  '🥕 胡萝卜',
  '🍫 巧克力',
  '🍇 葡萄',
];

export function ButtonMultiSelect() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      <Group>
        {selectedItems.includes(item) && <CheckIcon size={12} />}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <>
      <Box mb="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItems.length > 0 ? selectedItems.join(', ') : 'Nothing selected'}
        </Text>
      </Box>

      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItems((current) =>
            current.includes(val) ? current.filter((item) => item !== val) : [...current, val]
          );
        }}
      >
        <Combobox.Target>
          <Button onClick={() => combobox.toggleDropdown()}>选择项目</Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
