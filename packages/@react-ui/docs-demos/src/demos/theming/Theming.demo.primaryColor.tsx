import { Button, Group } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Group, Button, UIProvider, createTheme } from '@react-ui/ui';

const theme = createTheme({
  primaryColor: 'bright-pink',
  colors: {
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Group>
        <Button>主要按钮</Button>
        <Button color="blue">蓝色按钮</Button>
      </Group>
    </UIProvider>
  );
}

`;

function Demo() {
  return (
    <Group>
      <Button color="bright-pink">主要按钮</Button>
      <Button color="blue">蓝色按钮</Button>
    </Group>
  );
}

export const primaryColor: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
