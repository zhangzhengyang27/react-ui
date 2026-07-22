import { Button, TextInput } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/modals';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, Button } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        modals.open({
          title: '订阅新闻通讯',
          children: (
            <>
              <TextInput label="你的邮箱" placeholder="你的邮箱" data-autofocus />
              <Button fullWidth onClick={() => modals.closeAll()} mt="md">
                提交
              </Button>
            </>
          ),
        });
      }}
    >
      Open content modal
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button
      onClick={() => {
        modals.open({
          title: '订阅新闻通讯',
          children: (
            <>
              <TextInput label="你的邮箱" placeholder="你的邮箱" data-autofocus />
              <Button fullWidth onClick={() => modals.closeAll()} mt="md">
                提交
              </Button>
            </>
          ),
        });
      }}
    >
      Open content modal
    </Button>
  );
}

export const content: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
