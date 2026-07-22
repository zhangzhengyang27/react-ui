import { WarningCircleIcon } from '@phosphor-icons/react';
import { TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput } from '@xiaoye-react/ui';
import { WarningCircleIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <TextInput placeholder="错误状态为布尔值" label="错误状态为布尔值" error />
      <TextInput
        mt="md"
        placeholder="错误状态为 React 节点"
        label="错误状态为 React 节点"
        error="出错了"
      />

      <TextInput
        mt="md"
        placeholder="输入框不带错误样式"
        label="输入框不带错误样式"
        error="出错了"
        withErrorStyles={false}
        rightSectionPointerEvents="none"
        rightSection={
          <WarningCircleIcon
            size={20}
            color="var(--ui-color-error)"
          />
        }
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TextInput placeholder="错误状态为布尔值" label="错误状态为布尔值" error />
      <TextInput
        mt="md"
        placeholder="错误状态为 React 节点"
        label="错误状态为 React 节点"
        error="出错了"
      />

      <TextInput
        mt="md"
        placeholder="输入框不带错误样式"
        label="输入框不带错误样式"
        error="出错了"
        withErrorStyles={false}
        rightSectionPointerEvents="none"
        rightSection={<WarningCircleIcon size={20} color="var(--ui-color-error)" />}
      />
    </>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
