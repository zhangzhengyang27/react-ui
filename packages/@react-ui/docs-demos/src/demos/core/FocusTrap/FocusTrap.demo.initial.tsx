import { Box, Button, FocusTrap, TextInput } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useDisclosure } from '@react-ui/hooks';
import { FocusTrap, TextInput, Button, Box } from '@react-ui/ui';

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="第一个输入" placeholder="第一个输入" />
          <TextInput mt="sm" label="第二个输入" placeholder="第二个输入" data-autofocus />
          <TextInput mt="sm" label="第三个输入" placeholder="第三个输入" />
        </div>
      </FocusTrap>
    </Box>
  );
}
`;

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="第一个输入" placeholder="第一个输入" />
          <TextInput mt="sm" label="第二个输入" placeholder="第二个输入" data-autofocus />
          <TextInput mt="sm" label="第三个输入" placeholder="第三个输入" />
        </div>
      </FocusTrap>
    </Box>
  );
}

export const initial: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
