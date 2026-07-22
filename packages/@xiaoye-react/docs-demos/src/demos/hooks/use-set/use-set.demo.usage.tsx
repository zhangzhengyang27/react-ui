import { useState } from 'react';
import { Code, Stack, TextInput } from '@xiaoye-react/ui';
import { useSet } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Code, Stack, TextInput } from '@xiaoye-react/ui';
import { useSet } from '@xiaoye-react/hooks';

function Demo() {
  const [input, setInput] = useState('');
  const scopes = useSet<string>(['@ui', '@ui-tests', '@uix']);

  const isDuplicate = scopes.has(input.trim().toLowerCase());

  const items = Array.from(scopes).map((scope) => <Code key={scope}>{scope}</Code>);

  return (
    <>
      <TextInput
        label="添加新作用域"
        placeholder="输入作用域"
        description="不允许重复的作用域"
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
        error={isDuplicate && 'Scope already exists'}
        onKeyDown={(event) => {
          if (event.nativeEvent.code === 'Enter' && !isDuplicate) {
            scopes.add(input.trim().toLowerCase());
            setInput('');
          }
        }}
      />

      <Stack gap={5} align="flex-start" mt="md">
        {items}
      </Stack>
    </>
  );
}
`;

function Demo() {
  const [input, setInput] = useState('');
  const scopes = useSet<string>(['@ui', '@ui-tests', '@uix']);

  const isDuplicate = scopes.has(input.trim().toLowerCase());

  const items = Array.from(scopes).map((scope) => <Code key={scope}>{scope}</Code>);

  return (
    <>
      <TextInput
        label="添加新作用域"
        placeholder="输入作用域"
        description="不允许重复的作用域"
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
        error={isDuplicate && 'Scope already exists'}
        onKeyDown={(event) => {
          if (event.nativeEvent.code === 'Enter' && !isDuplicate) {
            scopes.add(input.trim().toLowerCase());
            setInput('');
          }
        }}
      />

      <Stack gap={5} align="flex-start" mt="md">
        {items}
      </Stack>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
