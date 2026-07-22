import { useState } from 'react';
import { Box, Button, Combobox, Text, useCombobox } from '@xiaoye-react/ui';

const groceries = [
  '🍎 苹果',
  '🍌 香蕉',
  '🥦 西兰花',
  '🥕 胡萝卜',
  '🍫 巧克力',
  '🍇 葡萄',
];

export function ButtonSearch() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));

  return (
    <>
      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target withAriaAttributes={false}>
          <Button onClick={() => combobox.toggleDropdown()}>选择项目</Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="搜索杂货"
          />
          <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>未找到</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Box mt="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItem || '未选择任何项'}
        </Text>
      </Box>
    </>
  );
}
