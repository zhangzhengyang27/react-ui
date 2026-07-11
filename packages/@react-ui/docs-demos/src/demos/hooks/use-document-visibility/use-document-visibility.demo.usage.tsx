import { Text } from '@react-ui/ui';
import { useDocumentTitle, useDocumentVisibility } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Text } from '@react-ui/ui';
import { useDocumentTitle, useDocumentVisibility } from '@react-ui/hooks';

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(\`Document is \${documentState}\`);
  return <Text>Switch to another tab to see document title change</Text>;
}
`;

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(`Document is ${documentState}`);
  return <Text>Switch to another tab to see document title change</Text>;
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
