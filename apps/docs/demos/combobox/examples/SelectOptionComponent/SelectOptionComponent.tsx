import { useState } from 'react';
import { Combobox, Group, Input, InputBase, Text, useCombobox } from '@react-ui/ui';

interface Item {
  emoji: string;
  value: string;
  description: string;
}

const groceries: Item[] = [
  { emoji: '🍎', value: 'Apples', description: '脆爽清新的水果' },
  { emoji: '🍌', value: 'Bananas', description: '天然甜美且富含钾的水果' },
  { emoji: '🥦', value: 'Broccoli', description: '营养丰富的绿色蔬菜' },
  { emoji: '🥕', value: 'Carrots', description: '爽脆且富含维生素的根菜' },
  { emoji: '🍫', value: 'Chocolate', description: '放纵美味的零食' },
];

function SelectOption({ emoji, value, description }: Item) {
  return (
    <Group>
      <Text fz={20}>{emoji}</Text>
      <div>
        <Text fz="sm" fw={500}>
          {value}
        </Text>
        <Text fz="xs" opacity={0.6}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

export function SelectOptionComponent() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const selectedOption = groceries.find((item) => item.value === value);

  const options = groceries.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <SelectOption {...item} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target targetType="button">
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
        >
          {selectedOption ? (
            <SelectOption {...selectedOption} />
          ) : (
            <Input.Placeholder>选择值</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
