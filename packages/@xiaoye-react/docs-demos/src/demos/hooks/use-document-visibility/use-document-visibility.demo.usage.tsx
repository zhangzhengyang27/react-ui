import { Text } from '@xiaoye-react/ui';
import { useDocumentTitle, useDocumentVisibility } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text } from '@xiaoye-react/ui';
import { useDocumentTitle, useDocumentVisibility } from '@xiaoye-react/hooks';

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(\`Document is \${documentState}\`);
  return <Text>切换到另一个标签查看文档标题变化</Text>;
}
`;

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(`Document is ${documentState}`);
  return <Text>切换到另一个标签查看文档标题变化</Text>;
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
