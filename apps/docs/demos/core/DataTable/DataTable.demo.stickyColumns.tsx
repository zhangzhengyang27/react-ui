import { DataTable } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { employees } from './_data';

const code = `
import { DataTable } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DataTable
      minWidth={900}
      columns={[
        { accessor: 'name', title: '姓名（左固定）', sticky: 'left', width: 160 },
        { accessor: 'department', title: '部门', width: 140 },
        { accessor: 'city', title: '城市', width: 140 },
        { accessor: 'salary', title: '薪资', width: 140, textAlign: 'right' },
        { accessor: 'onboard', title: '入职日期', width: 160 },
        { accessor: 'id', title: '工号（右固定）', sticky: 'right', width: 140 },
      ]}
      records={employees}
      rowKey={(record) => record.id}
      withTableBorder
    />
  );
}
`;

const columns = [
    { accessor: 'name', title: '姓名（左固定）', sticky: 'left' as const, width: 160 },
    { accessor: 'department', title: '部门', width: 140 },
    { accessor: 'city', title: '城市', width: 140 },
    { accessor: 'salary', title: '薪资', width: 140, textAlign: 'right' as const },
    { accessor: 'onboard', title: '入职日期', width: 160 },
    { accessor: 'id', title: '工号（右固定）', sticky: 'right' as const, width: 140 }
]

function Demo() {
    return (
        <DataTable
            minWidth={900}
            columns={columns}
            records={employees}
            rowKey={record => record.id}
            withTableBorder
        />
    );
}

export const stickyColumns: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
