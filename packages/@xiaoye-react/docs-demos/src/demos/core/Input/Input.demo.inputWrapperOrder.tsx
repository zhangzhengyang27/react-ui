import { TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <TextInput
        label="自定义布局"
        placeholder="自定义布局"
        description="输入框下方的描述"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
      />
      <TextInput
        mt="xl"
        label="自定义布局"
        placeholder="自定义布局"
        description="错误和描述"
        error="都在输入框下方"
        inputWrapperOrder={['label', 'input', 'description', 'error']}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TextInput
        label="自定义布局"
        placeholder="自定义布局"
        description="输入框下方的描述"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
      />
      <TextInput
        mt="md"
        label="自定义布局"
        placeholder="自定义布局"
        description="错误和描述"
        error="都在输入框下方"
        inputWrapperOrder={['label', 'input', 'description', 'error']}
      />
    </>
  );
}

export const inputWrapperOrder: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
