import { useState } from 'react';
import { DataTable } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { employees } from './_data';

const code = `
import { useState } from 'react';
import { DataTable } from '@xiaoye-react/ui';

function Demo() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['E-1001']);

  return (
    <DataTable
      columns={[
        { accessor: 'name', title: '姓名' },
        { accessor: 'department', title: '部门' },
        { accessor: 'city', title: '城市' },
      ]}
      records={employees}
      rowKey={(record) => record.id}
      selectionMode="checkbox"
      selectedKeys={selectedKeys}
      onSelectedKeysChange={setSelectedKeys}
      highlightOnHover
    />
  );
}
`;

const columns = [
    { accessor: 'name', title: '姓名' },
    { accessor: 'department', title: '部门' },
    { accessor: 'city', title: '城市' }
]

function Demo() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['E-1001']);

    return (
        <DataTable
            columns={columns}
            records={employees}
            rowKey={record => record.id}
            selectionMode="checkbox"
            selectedKeys={selectedKeys}
            onSelectedKeysChange={setSelectedKeys}
            highlightOnHover
        />
    );
}

export const selection: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
