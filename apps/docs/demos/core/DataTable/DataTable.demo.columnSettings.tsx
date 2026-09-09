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
        { accessor: 'department', title: '部门' },
        { accessor: 'city', title: '城市' },
        { accessor: 'salary', title: '薪资', textAlign: 'right' },
      ]}
      records={employees}
      rowKey={(record) => record.id}
      withColumnSettings
      striped
    />
  );
}
`;

const columns = [
    { accessor: 'name', title: '姓名' },
    { accessor: 'department', title: '部门' },
    { accessor: 'city', title: '城市' },
    { accessor: 'salary', title: '薪资', textAlign: 'right' as const }
]

function Demo() {
    return (
        <DataTable
            columns={columns}
            records={employees}
            rowKey={record => record.id}
            withColumnSettings
            striped
        />
    );
}

export const columnSettings: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
