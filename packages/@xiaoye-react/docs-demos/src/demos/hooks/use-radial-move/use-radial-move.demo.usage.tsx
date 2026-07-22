import { useState } from 'react';
import { Box } from '@xiaoye-react/ui';
import { useRadialMove } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './use-radial-move.demo.usage.module.css';

const code = `
import { useState } from 'react';
import { Box } from '@xiaoye-react/ui';
import { useRadialMove } from '@xiaoye-react/hooks';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState(115);
  const { ref } = useRadialMove(setValue);

  return (
    <Box className={classes.root} ref={ref} style={{ '--angle': \`\${value}deg\` }}>
      <div className={classes.value}>{value}°</div>
      <div className={classes.thumb} />
    </Box>
  );
}
`;

const cssCode = `.root {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  --empty-color: light-dark(var(--ui-color-gray-2), var(--ui-color-dark-6));
  --filled-color: light-dark(var(--ui-color-blue-6), var(--ui-color-blue-8));

  background-image: conic-gradient(
    var(--filled-color) 0deg,
    var(--filled-color) var(--angle, 0deg),
    var(--empty-color) var(--angle, 0deg)
  );
}

.value {
  background-color: var(--ui-color-body);
  width: 132px;
  height: 132px;
  border-radius: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb {
  position: absolute;
  width: 14px;
  height: 160px;
  transform: rotate(var(--angle, 0deg));

  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: light-dark(var(--ui-color-white), var(--filled-color));
    border: 2px solid light-dark(var(--filled-color), var(--ui-color-white));
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
}`;

function Demo() {
  const [value, setValue] = useState(115);
  const { ref } = useRadialMove(setValue);

  return (
    <Box className={classes.root} ref={ref} style={{ '--angle': `${value}deg` }}>
      <div className={classes.value}>{value}°</div>
      <div className={classes.thumb} />
    </Box>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
  centered: true,
};
