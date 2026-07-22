import { FileTextIcon, FolderOpenIcon, FolderSimpleIcon } from '@phosphor-icons/react';
import { Button, Group, RenderTreeNodePayload, Tree, useTree } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './data';

const code = `
import { FileTextIcon, FolderOpenIcon, FolderSimpleIcon } from '@phosphor-icons/react';
import { Button, Group, RenderTreeNodePayload, Tree, useTree } from '@xiaoye-react/ui';
import { data } from './data';

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={6} {...elementProps}>
      {hasChildren ? (
        expanded ? (
          <FolderOpenIcon size={14} style={{ opacity: 0.75 }} />
        ) : (
          <FolderSimpleIcon size={14} style={{ opacity: 0.75 }} />
        )
      ) : (
        <FileTextIcon size={14} style={{ opacity: 0.75 }} />
      )}
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  const tree = useTree();

  return (
    <>
      <Tree data={data} tree={tree} withLines renderNode={(payload) => <Leaf {...payload} />} />
      <Group mt="md">
        <Button onClick={() => tree.expandAllNodes()}>全部展开</Button>
        <Button onClick={() => tree.collapseAllNodes()}>全部折叠</Button>
      </Group>
    </>
  );
}
`;

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={6} {...elementProps}>
      {hasChildren ? (
        expanded ? (
          <FolderOpenIcon size={14} style={{ opacity: 0.75 }} />
        ) : (
          <FolderSimpleIcon size={14} style={{ opacity: 0.75 }} />
        )
      ) : (
        <FileTextIcon size={14} style={{ opacity: 0.75 }} />
      )}
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  const tree = useTree();

  return (
    <>
      <Tree data={data} tree={tree} withLines renderNode={(payload) => <Leaf {...payload} />} />
      <Group mt="md">
        <Button onClick={() => tree.expandAllNodes()}>全部展开</Button>
        <Button onClick={() => tree.collapseAllNodes()}>全部折叠</Button>
      </Group>
    </>
  );
}

export const controller: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
};
