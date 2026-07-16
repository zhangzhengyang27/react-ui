import { useState } from 'react';
import { Button } from '@react-ui/ui';
import { randomId, useDocumentTitle } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { useDocumentTitle, randomId } from '@react-ui/hooks';
import { Button } from '@react-ui/ui';

function Demo() {
  const [title, setTitle] = useState('');
  useDocumentTitle(title);

  return (
    <Button onClick={() => setTitle(randomId())}>
      Set document title to random id
    </Button>
  );
}`;

function Demo() {
  const [title, setTitle] = useState('');
  useDocumentTitle(title);

  return <Button onClick={() => setTitle(randomId())}>将文档标题设为随机 ID</Button>;
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
