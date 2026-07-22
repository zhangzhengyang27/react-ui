import { useState } from 'react';
import { Combobox, Highlight, TextInput, useCombobox } from '@xiaoye-react/ui';

const groceries = [
  '🍎 苹果',
  '🍌 香蕉',
  '🥦 西兰花',
  '🥕 胡萝卜',
  '🍫 巧克力',
  '🍇 葡萄',
];

export function AutocompleteHighlight() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [value, setValue] = useState('');
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      <Highlight highlight={value} size="sm">
        {item}
      </Highlight>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="选择值或输入任意内容"
          placeholder="选择值或输入任意内容"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.updateSelectedOptionIndex();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? <Combobox.Empty>未找到</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
