import { MantineDemo } from '@react-ui/demo';
import classes from './Styles.demo.containers.module.css';

const cssCode = `.root {
  min-width: 200px;
  max-width: 100%;
  min-height: 120px;
  container-type: inline-size;
  overflow: auto;
  resize: horizontal;
}

.child {
  background-color: var(--ui-color-dimmed);
  color: var(--ui-color-white);
  padding: var(--ui-spacing-md);

  @container (max-width: 500px) {
    background-color: var(--ui-color-blue-filled);
  }

  @container (max-width: 300px) {
    background-color: var(--ui-color-red-filled);
  }
}`;

const code = `
import classes from './Demo.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <div className={classes.child}>Resize parent element to see container query in action</div>
    </div>
  );
}
`;

function Demo() {
  return (
    <div className={classes.root}>
      <div className={classes.child}>Resize parent element to see container query in action</div>
    </div>
  );
}

export const containers: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code: cssCode, language: 'scss', fileName: 'Demo.module.css' },
    { code, language: 'tsx', fileName: 'Demo.tsx' },
  ],
};
