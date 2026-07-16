import { Input } from '@react-ui/ui';
import { MdxCodeHighlight } from '@/components/MdxProvider';

interface ColorsOutputProps {
  colors: string[];
}

function getProviderCode(colors: string[]) {
  return `import { UIProvider, createTheme, UIColorsTuple } from '@react-ui/ui';

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

export function ColorsOutput({ colors }: ColorsOutputProps) {
  // For some reason code highlight does not properly update when colors change without key
  const keyBase = JSON.stringify(colors);
  return (
    <>
      <Input.Label size="md" labelElement="div" mt="xl">
        Colors array
      </Input.Label>

      <MdxCodeHighlight
        language="json"
        code={JSON.stringify(colors, null, 2)}
        key={`${keyBase}-1`}
      />

      <Input.Label size="md" labelElement="div" mt="xl">
        Usage with UIProvider
      </Input.Label>

      <MdxCodeHighlight language="tsx" code={getProviderCode(colors)} key={keyBase} />
    </>
  );
}
