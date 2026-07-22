import { useState } from 'react';
import { Button, Combobox, TextInput, useCombobox } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { TextInput, Button, Combobox, useCombobox } from '@xiaoye-react/ui';

const groceries = ['🍎 苹果', '🍌 香蕉', '🥦 西兰花', '🥕 胡萝卜', '🍫 巧克力'];

function Demo() {
  const [opened, setOpened] = useState(false);
  const combobox = useCombobox({ opened });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Button mb="md" onClick={() => setOpened((o) => !o)}>
        Toggle dropdown
      </Button>

      <Combobox store={combobox}>
        <Combobox.Target>
          <TextInput
            label="自动完成"
            description="点击按钮时打开/关闭下拉"
            placeholder="点击按钮切换下拉"
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
`;

const groceries = ['🍎 苹果', '🍌 香蕉', '🥦 西兰花', '🥕 胡萝卜', '🍫 巧克力'];

function Demo() {
  const [opened, setOpened] = useState(false);
  const combobox = useCombobox({ opened });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Button mb="md" onClick={() => setOpened((o) => !o)}>
        Toggle dropdown
      </Button>

      <Combobox store={combobox}>
        <Combobox.Target>
          <TextInput
            label="自动完成"
            description="点击按钮时打开/关闭下拉"
            placeholder="点击按钮切换下拉"
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

export const controlledDropdown: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
};
