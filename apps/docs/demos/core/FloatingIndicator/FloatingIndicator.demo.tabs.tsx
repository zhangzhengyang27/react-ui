import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './FloatingIndicator.demo.tabs.module.css';

const cssCode = `
.list {
  position: relative;
  margin-bottom: var(--ui-spacing-md);
}

.indicator {
  background-color: var(--ui-color-white);
  border-radius: var(--ui-radius-md);
  border: 1px solid var(--ui-color-gray-2);
  box-shadow: var(--ui-shadow-sm);

  [data-ui-color-scheme='dark'] & {
    background-color: var(--ui-color-dark-6);
    border-color: var(--ui-color-dark-4);
  }
}

.tab {
  z-index: 1;
  font-weight: 600;
  transition: color 100ms ease;
  color: var(--ui-color-gray-7);

  &[data-active] {
    color: var(--ui-color-black);
  }

  [data-ui-color-scheme='dark'] & {
    color: var(--ui-color-dark-1);

    &[data-active] {
      color: var(--ui-color-white);
    }
  }
}
`;

const code = `
import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | undefined>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          第一个标签
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          第二个标签
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          第三个标签
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">第一个标签内容</Tabs.Panel>
      <Tabs.Panel value="2">第二个标签内容</Tabs.Panel>
      <Tabs.Panel value="3">第三个标签内容</Tabs.Panel>
    </Tabs>
  );
}
`;

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | undefined>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          第一个标签
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          第二个标签
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          第三个标签
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">第一个标签内容</Tabs.Panel>
      <Tabs.Panel value="2">第二个标签内容</Tabs.Panel>
      <Tabs.Panel value="3">第三个标签内容</Tabs.Panel>
    </Tabs>
  );
}

export const tabs: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
