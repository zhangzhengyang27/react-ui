import { Button, TextInput } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TextInput, Button } from '@react-ui/ui';
import { modals } from '@react-ui/modals';

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
