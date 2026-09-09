import { useState } from 'react';
import { Button, DataTable, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { employees } from './_data';

const code = `
import { useState } from 'react';
import { DataTable, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <DataTable
      columns={[
        { accessor: 'name', title: '姓名' },
        { accessor: 'department', title: '部门' },
        { accessor: 'city', title: '城市' },
      ]}
      records={[]}
      loading={loading}
      empty={
        <div style={{ padding: 24, color: 'var(--ui-color-dimmed)' }}>
          没有符合条件的员工，试试调整筛选条件
        </div>
      }
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
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Group gap="sm" mb="md">
                <Button size="xs" variant="default" onClick={() => setLoading(true)}>
                    展示 loading
                </Button>
                <Button size="xs" variant="default" onClick={() => setLoading(false)}>
                    展示空态
                </Button>
            </Group>
            <DataTable
                columns={columns}
                records={[]}
                loading={loading}
                empty={
                    <div style={{ padding: 24, color: 'var(--ui-color-dimmed)' }}>
                        没有符合条件的员工，试试调整筛选条件
                    </div>
                }
            />
        </div>
    );
}

export const states: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
