import { useState } from 'react';
import { Transfer } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Transfer } from '@xiaoye-react/ui';

const permissions = [
  { value: 'read', label: '查看' },
  { value: 'create', label: '新建' },
  { value: 'update', label: '编辑' },
  { value: 'delete', label: '删除' },
  { value: 'export', label: '导出', disabled: true },
];

function Demo() {
  const [value, setValue] = useState<string[]>(['read', 'create']);

  return <Transfer data={permissions} value={value} onChange={setValue} titles={['可选权限', '已授权']} />;
}
`;

const permissions = [
    { value: 'read', label: '查看' },
    { value: 'create', label: '新建' },
    { value: 'update', label: '编辑' },
    { value: 'delete', label: '删除' },
    { value: 'export', label: '导出', disabled: true }
]

function Demo() {
    const [value, setValue] = useState<string[]>(['read', 'create']);

    return <Transfer data={permissions} value={value} onChange={setValue} titles={['可选权限', '已授权']} />;
}

export const usage: UIDemo = { type: 'code', code, component: Demo };
