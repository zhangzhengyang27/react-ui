import { useEffect, useState } from 'react';
import { Button, Stack, Text } from '@react-ui/ui';
import { useInterval } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState, useEffect } from 'react';
import { useInterval } from '@react-ui/hooks';
import { Stack, Button, Text } from '@react-ui/ui';

function Demo() {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Stack align="center">
      <Text>页面加载于 <b>{seconds}</b> 秒前</Text>
      <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'}>
        {interval.active ? 'Stop' : 'Start'} counting
      </Button>
    </Stack>
  );
}
`;

function Demo() {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Stack align="center">
      <Text>
        Page loaded <b>{seconds}</b> seconds ago
      </Text>
      <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'}>
        {interval.active ? 'Stop' : 'Start'} counting
      </Button>
    </Stack>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
