import { useState } from 'react';
import { Text } from '@react-ui/ui';
import { usePageLeave } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { usePageLeave } from '@react-ui/hooks';

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

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
