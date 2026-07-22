import { Button, Flex } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Flex, Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Flex>
  );
}
`;

function Demo() {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Flex>
  );
}

export const responsive: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
