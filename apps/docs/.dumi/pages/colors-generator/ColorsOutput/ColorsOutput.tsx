import { Input } from '@xiaoye-react/ui';

interface ColorsOutputProps {
  colors: string[];
}

function getProviderCode(colors: string[]) {
  return `import { UIProvider, createTheme, UIColorsTuple } from '@xiaoye-react/ui';

const myColor: UIColorsTuple = ${JSON.stringify(colors, null, 2).replace(/"/g, "'")};

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}`;
}

const codeBlockStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: 6,
  fontSize: 13,
  lineHeight: 1.6,
  overflowX: 'auto',
  backgroundColor: 'light-dark(rgba(0,0,0,0.04), rgba(255,255,255,0.06))',
  margin: '12px 0',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

export function ColorsOutput({ colors }: ColorsOutputProps) {
  const keyBase = JSON.stringify(colors);
  return (
    <>
      <Input.Label size="md" labelElement="div" mt="xl">
        Colors array
      </Input.Label>

      <pre style={codeBlockStyle} key={`${keyBase}-1`}>
        <code>{JSON.stringify(colors, null, 2)}</code>
      </pre>

      <Input.Label size="md" labelElement="div" mt="xl">
        Usage with UIProvider
      </Input.Label>

      <pre style={codeBlockStyle} key={keyBase}>
        <code>{getProviderCode(colors)}</code>
      </pre>
    </>
  );
}
