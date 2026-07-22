import React, { useState } from 'react';
import { Combobox, InputBase } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <DemoWrap>
      <Combobox opened={opened} onChange={setOpened}>
        <Combobox.Target>
          <InputBase placeholder="点击展开" onFocus={() => setOpened(true)} />
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value="react">React</Combobox.Option>
            <Combobox.Option value="vue">Vue</Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </DemoWrap>
  );
};

export default App;
