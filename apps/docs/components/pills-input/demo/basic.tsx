import React, { useState } from 'react';
import { PillsInput, Pill } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>(['react']);
  return (
    <DemoWrap>
      <PillsInput>
        <Pill.Group>
          {value.map((item) => (
            <Pill key={item} withRemoveButton onRemove={() => setValue(value.filter((v) => v !== item))}>
              {item}
            </Pill>
          ))}
        </Pill.Group>
        <PillsInput.Field />
      </PillsInput>
    </DemoWrap>
  );
};

export default App;
