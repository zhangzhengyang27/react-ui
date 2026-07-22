import { useState } from 'react';
import { TextInput } from '@xiaoye-react/ui';
import { getHotkeyHandler } from '@xiaoye-react/hooks';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { getHotkeyHandler } from '@xiaoye-react/hooks';
import { notifications } from '@xiaoye-react/notifications';
import { TextInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState("I've just used a hotkey to send a message");
  const handleSubmit = () => notifications.show({ title: '你的消息', message: value });
  const handleSave = () => notifications.show({ title: '已保存', color: 'teal', message: value });

  return (
    <TextInput
      placeholder="你的消息"
      label="输入框聚焦时按 ⌘+Enter 或 Ctrl+Enter 发送消息"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', handleSubmit],
        ['mod+S', handleSave],
      ])}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState("I've just used a hotkey to send a message");
  const handleSubmit = () => notifications.show({ title: '你的消息', message: value });
  const handleSave = () =>
    notifications.show({ title: '已保存', color: 'teal', message: value });

  return (
    <TextInput
      placeholder="你的消息"
      label="输入框聚焦时按 ⌘+Enter 或 Ctrl+Enter 发送消息"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', handleSubmit],
        ['mod+S', handleSave],
      ])}
    />
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
