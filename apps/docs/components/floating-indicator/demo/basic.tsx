import React, { useRef, useState } from 'react';
import { FloatingIndicator, Group, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [active, setActive] = useState(0);
  // parent 必须带 position: relative，且 target / parent 都要是真实 DOM 节点
  const [parent, setParent] = useState<HTMLDivElement | null>(null);
  const targets = useRef<Record<number, HTMLButtonElement | null>>({});
  const items = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <DemoWrap>
      <Group ref={setParent} pos="relative">
        {items.map((item, index) => (
          <Button
            key={item}
            variant="transparent"
            style={{
              position: 'relative',
              zIndex: 1,
              color: 'var(--ui-primary-color-light-color)',
            }}
            ref={(node) => {
              targets.current[index] = node;
            }}
            onClick={() => setActive(index)}
          >
            {item}
          </Button>
        ))}

        <FloatingIndicator
          target={targets.current[active]}
          parent={parent}
          styles={{
            root: { background: 'var(--ui-primary-color-light)', borderRadius: 'var(--ui-radius-md)' },
          }}
        />
      </Group>
    </DemoWrap>
  );
};

export default App;
