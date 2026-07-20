import React from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { ActionIcon, Code, CopyButton, Group } from '@react-ui/ui';
import CSS_FILES_LIST from '@docs/css-exports';
import DataTable from '../DataTable';

import classes from './index.module.css';

const allCssFilesPaths = [...CSS_FILES_LIST.global, ...CSS_FILES_LIST.modules];

interface CssFilePathProps {
  filePath: string;
}

function CssFilePath({ filePath }: CssFilePathProps) {
  const importCode = `import '@react-ui/ui/styles/${filePath}';`;
  return (
    <Group wrap="nowrap" gap={5}>
      <CopyButton value={importCode}>
        {({ copy, copied }) => (
          <ActionIcon
            variant={copied ? 'filled' : 'default'}
            color={copied ? 'teal' : undefined}
            onClick={copy}
            size="sm"
          >
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
          </ActionIcon>
        )}
      </CopyButton>
      <Code className={classes.fileName}>{importCode}</Code>
    </Group>
  );
}

const CssFilesList: React.FC = () => {
  const files = allCssFilesPaths.map((filePath: string) => [
    filePath.replace('.css', ''),
    <CssFilePath key={filePath} filePath={filePath} />,
  ]);

  return <DataTable data={files} head={['组件', '引入方式']} />;
};

export default CssFilesList;
