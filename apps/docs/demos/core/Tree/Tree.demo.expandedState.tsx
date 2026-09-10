import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText'
import { FolderOpenIcon } from '@phosphor-icons/react/dist/csr/FolderOpen'
import { FolderSimpleIcon } from '@phosphor-icons/react/dist/csr/FolderSimple'
import { getTreeExpandedState, Group, RenderTreeNodePayload, Tree, useTree } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { data, dataCode } from './data'

const code = `
import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText';
import { FolderOpenIcon } from '@phosphor-icons/react/dist/csr/FolderOpen';
import { FolderSimpleIcon } from '@phosphor-icons/react/dist/csr/FolderSimple';
import {
  getTreeExpandedState,
  Group,
  RenderTreeNodePayload,
  Tree,
  useTree,
} from '@xiaoye-react/ui';
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
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, ['src', 'src/components']),
  });

  return <Tree data={data} tree={tree} withLines renderNode={(payload) => <Leaf {...payload} />} />;
}
`

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
    )
}

function Demo() {
    const tree = useTree({
        initialExpandedState: getTreeExpandedState(data, ['src', 'src/components'])
    })

    return <Tree data={data} tree={tree} withLines renderNode={payload => <Leaf {...payload} />} />
}

export const expandedState: UIDemo = {
    type: 'code',
    component: Demo,
    code: [
        { fileName: '演示代码.tsx', language: 'tsx', code },
        { fileName: 'data.ts', language: 'tsx', code: dataCode }
    ]
}
