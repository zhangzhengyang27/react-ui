import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText'
import { FolderOpenIcon } from '@phosphor-icons/react/dist/csr/FolderOpen'
import { FolderSimpleIcon } from '@phosphor-icons/react/dist/csr/FolderSimple'
import { Group, Text, TreeSelect, TreeSelectProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { data, dataCode } from './data'

const code = `
import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText';
import { FolderOpenIcon } from '@phosphor-icons/react/dist/csr/FolderOpen';
import { FolderSimpleIcon } from '@phosphor-icons/react/dist/csr/FolderSimple';
import { Group, Text, TreeSelect, TreeSelectProps } from '@xiaoye-react/ui';
import { data } from './data';

const renderTreeNode: TreeSelectProps['renderNode'] = ({ node, hasChildren, expanded }) => (
  <Group gap="xs">
    {hasChildren ? (
      expanded ? (
        <FolderOpenIcon color="var(--ui-color-yellow-9)" size={16} />
      ) : (
        <FolderSimpleIcon color="var(--ui-color-yellow-9)" size={16} />
      )
    ) : (
      <FileTextIcon size={16} />
    )}
    <Text size="sm">{node.label}</Text>
  </Group>
);

function Demo() {
  return (
    <TreeSelect
      label="你最喜欢的项目"
      placeholder="选择值"
      data={data}
      renderNode={renderTreeNode}
      defaultExpandAll
    />
  );
}
`

const renderTreeNode: TreeSelectProps['renderNode'] = ({ node, hasChildren, expanded }) => (
    <Group gap="xs">
        {hasChildren ? (
            expanded ? (
                <FolderOpenIcon color="var(--ui-color-yellow-9)" size={16} />
            ) : (
                <FolderSimpleIcon color="var(--ui-color-yellow-9)" size={16} />
            )
        ) : (
            <FileTextIcon size={16} />
        )}
        <Text size="sm">{node.label}</Text>
    </Group>
)

function Demo() {
    return (
        <TreeSelect
            label="你最喜欢的项目"
            placeholder="选择值"
            data={data}
            renderNode={renderTreeNode}
            defaultExpandAll
        />
    )
}

export const renderNode: UIDemo = {
    type: 'code',
    component: Demo,
    code: [
        { fileName: '演示代码.tsx', language: 'tsx', code },
        { fileName: 'data.ts', language: 'tsx', code: dataCode }
    ],
    maxWidth: 340,
    centered: true,
    defaultExpanded: false
}
