import { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox } from '@xiaoye-react/ui';
import classes from './SelectedStyles.module.css';

const groceries = [
  '🍎 苹果',
  '🍌 香蕉',
  '🥦 西兰花',
  '🥕 胡萝卜',
  '🍫 巧克力',
  '🍇 葡萄',
];

export function SelectedStyles() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item, index) => (
    <Combobox.Option
      value={item}
      key={item}
      className={classes.option}
      onMouseOver={() => combobox.selectOption(index)}
    >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value || <Input.Placeholder>选择值</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown onMouseLeave={() => combobox.resetSelectedOption()}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
