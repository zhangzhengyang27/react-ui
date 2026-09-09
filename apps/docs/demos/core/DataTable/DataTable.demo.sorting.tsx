import { DataTable } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { employees } from './_data';

const code = `
import { DataTable } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DataTable
      columns={[
        { accessor: 'name', title: '姓名' },
        { accessor: 'department', title: '部门', sortable: true },
        { accessor: 'city', title: '城市', sortable: true },
        { accessor: 'salary', title: '薪资', sortable: true, textAlign: 'right' },
      ]}
      records={employees}
      rowKey={(record) => record.id}
      defaultSortStatus={{ accessor: 'salary', direction: 'desc' }}
      highlightOnHover
    />
  );
}
`;

const columns = [
    { accessor: 'name', title: '姓名' },
    { accessor: 'department', title: '部门', sortable: true },
    { accessor: 'city', title: '城市', sortable: true },
    { accessor: 'salary', title: '薪资', sortable: true, textAlign: 'right' as const }
]

function Demo() {
    return (
        <DataTable
            columns={columns}
            records={employees}
            rowKey={record => record.id}
            defaultSortStatus={{ accessor: 'salary', direction: 'desc' }}
            highlightOnHover
        />
    );
}

export const sorting: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
