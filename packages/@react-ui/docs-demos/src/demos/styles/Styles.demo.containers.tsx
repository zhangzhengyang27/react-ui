import { UIDemo } from '@react-ui/demo';
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
      <div className={classes.child}>调整父元素大小查看容器查询效果</div>
    </div>
  );
}
`;

function Demo() {
  return (
    <div className={classes.root}>
      <div className={classes.child}>调整父元素大小查看容器查询效果</div>
    </div>
  );
}

export const containers: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code: cssCode, language: 'scss', fileName: '演示样式.module.css' },
    { code, language: 'tsx', fileName: '演示代码.tsx' },
  ],
};
