import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText'
import { FolderOpenIcon } from '@phosphor-icons/react/dist/csr/FolderOpen'
import { FolderSimpleIcon } from '@phosphor-icons/react/dist/csr/FolderSimple'
import { Checkbox, Group, RenderTreeNodePayload, Tree, useTree } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { data, dataCode } from './data'

const code = `
import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText';
import { FolderOpenIcon } from '@phosphor-icons/react/dist/csr/FolderOpen';
import { FolderSimpleIcon } from '@phosphor-icons/react/dist/csr/FolderSimple';
import { Checkbox, Group, RenderTreeNodePayload, Tree, useTree } from '@xiaoye-react/ui';
import { data } from './data';

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  isRoot,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        size="xs"
        ms={isRoot ? undefined : 2}
        onClick={() =>
          checked
            ? tree.uncheckNode(node.value)
            : tree.checkNode(node.value)
        }
      />

      <Group gap={6} onClick={() => tree.toggleExpanded(node.value)}>
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
    </Group>
  );
};

function Demo() {
  const tree = useTree({ checkStrictly: true });
  return (
    <Tree
      data={data}
      tree={tree}
      levelOffset={23}
      expandOnClick={false}
      withLines
      renderNode={renderTreeNode}
    />
  );
}
`

const renderTreeNode = ({ node, expanded, hasChildren, isRoot, elementProps, tree }: RenderTreeNodePayload) => {
    const checked = tree.isNodeChecked(node.value)

    return (
        <Group gap="xs" {...elementProps}>
            <Checkbox.Indicator
                checked={checked}
                size="xs"
                ms={isRoot ? undefined : 2}
                onClick={() => (checked ? tree.uncheckNode(node.value) : tree.checkNode(node.value))}
            />

            <Group gap={6} onClick={() => tree.toggleExpanded(node.value)}>
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
        </Group>
    )
}

function Demo() {
    const tree = useTree({ checkStrictly: true })
    return <Tree data={data} tree={tree} levelOffset={23} expandOnClick={false} withLines renderNode={renderTreeNode} />
}

export const checkStrictly: UIDemo = {
    type: 'code',
    component: Demo,
    code: [
        { fileName: '演示代码.tsx', language: 'tsx', code },
        { fileName: 'data.ts', language: 'tsx', code: dataCode }
    ]
}
