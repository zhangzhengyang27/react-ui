import { Button, Code, Group, Title } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, Code, Title, UIProvider, createTheme } from '@react-ui/ui';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Outfit, sans-serif' },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Title order={3}>Outfit 或无衬线标题</Title>
      <Button>Verdana 按钮</Button>
      <Code>Monaco、Courier 代码</Code>
    </UIProvider>
  );
}
`;

function Demo() {
  return (
    <>
      <Title order={3} ff="Outfit, sans-serif" ta="center">
        Outfit or sans-serif title
      </Title>
      <Group mt="md">
        <Button ff="Verdana, sans-serif">Verdana 按钮</Button>
        <Code ff="Monaco, Courier, monospace">Monaco、Courier 代码</Code>
      </Group>
    </>
  );
}

export const fonts: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
