import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './FloatingIndicator.demo.segmented.module.css';

const code = `
import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@react-ui/ui';
import classes from './Demo.module.css';

const data = ['React', 'Vue', 'Angular', 'Svelte'];

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}
`;

const cssCode = `.root {
  position: relative;
  background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-8));
  width: fit-content;
  border-radius: var(--ui-radius-md);
  padding: 5px;
  border: 1px solid light-dark(var(--ui-color-gray-2), var(--ui-color-dark-4));
}

.control {
  padding: 7px 12px;
  line-height: 1;
  color: light-dark(var(--ui-color-gray-7), var(--ui-color-dark-2));
  border-radius: var(--ui-radius-md);
  font-size: var(--ui-font-size-sm);
  transition: color 100ms ease;
  font-weight: 600;

  &:hover {
    color: light-dark(var(--ui-color-black), var(--ui-color-white));
    background-color: light-dark(var(--ui-color-gray-1), var(--ui-color-dark-7));
  }

  &[data-active] {
    color: var(--ui-color-white);
  }
}

.controlLabel {
  position: relative;
  z-index: 1;
}

.indicator {
  background-color: var(--ui-primary-color-filled);
  border-radius: var(--ui-radius-md);
}`;

const data = ['React', 'Vue', 'Angular', 'Svelte'];

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}

export const segmented: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  defaultExpanded: false,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '演示样式.module.css', language: 'scss', code: cssCode },
  ],
};
