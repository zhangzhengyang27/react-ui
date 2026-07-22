import { Button, Group, List } from '@xiaoye-react/ui';
import { useFileDialog } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, List } from '@xiaoye-react/ui';
import { useFileDialog } from '@xiaoye-react/hooks';

function Demo() {
  const fileDialog = useFileDialog();

  const pickedFiles = Array.from(fileDialog.files || []).map((file) => (
    <List.Item key={file.name}>{file.name}</List.Item>
  ));

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>选择文件</Button>
        {pickedFiles.length > 0 && (
          <Button variant="default" onClick={fileDialog.reset}>
            Reset
          </Button>
        )}
      </Group>
      {pickedFiles.length > 0 && <List mt="lg">{pickedFiles}</List>}
    </div>
  );
}
`;

function Demo() {
  const fileDialog = useFileDialog();

  const pickedFiles = Array.from(fileDialog.files || []).map((file) => (
    <List.Item key={file.name}>{file.name}</List.Item>
  ));

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>选择文件</Button>
        {pickedFiles.length > 0 && (
          <Button variant="default" onClick={fileDialog.reset}>
            Reset
          </Button>
        )}
      </Group>
      {pickedFiles.length > 0 && <List mt="lg">{pickedFiles}</List>}
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
