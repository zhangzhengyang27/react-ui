import { useState } from 'react';
import { Text } from '@xiaoye-react/ui';
import { usePageLeave } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { usePageLeave } from '@xiaoye-react/hooks';

function Demo() {
  const [leftsCount, setLeftsCount] = useState(0);
  usePageLeave(() => setLeftsCount((p) => p + 1));
  return <>Mouse left the page {leftsCount} times</>;
}
`;

function Demo() {
  const [leftsCount, setLeftsCount] = useState(0);
  usePageLeave(() => setLeftsCount((p) => p + 1));
  return <Text ta="center">Mouse left the page {leftsCount} times</Text>;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
