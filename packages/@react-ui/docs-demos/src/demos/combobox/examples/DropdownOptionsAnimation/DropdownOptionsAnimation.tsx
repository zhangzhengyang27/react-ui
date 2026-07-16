import { useState } from 'react';
import cx from 'clsx';
import { Combobox, Input, InputBase, useCombobox } from '@react-ui/ui';
import classes from './DropdownOptionsAnimation.module.css';

const groceries = [
  '🍎 苹果',
  '🍌 香蕉',
  '🥦 西兰花',
  '🥕 胡萝卜',
  '🍫 巧克力',
  '🍇 葡萄',
];

export function DropdownOptionsAnimation() {
  const [animating, setAnimating] = useState(false);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setAnimating(false);
    },

    onDropdownOpen: () => setAnimating(true),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item, index) => (
    <Combobox.Option
      value={item}
      key={item}
      className={cx({ [classes.animateOption]: animating })}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {item}
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
        >
          {value || <Input.Placeholder>选择值</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
