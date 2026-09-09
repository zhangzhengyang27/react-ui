import { DataTable } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { employees } from './_data';

const code = `
import { DataTable } from '@xiaoye-react/ui';

// 远端分页：records 只传当前页数据，total 传总条数即可
const currentPage = employees.slice(0, 3);

function Demo() {
  return (
    <DataTable
      columns={[
        { accessor: 'name', title: '姓名' },
        { accessor: 'department', title: '部门' },
        { accessor: 'salary', title: '薪资', textAlign: 'right' },
      ]}
      records={currentPage}
      total={45}
      rowKey={(record) => record.id}
      pageSizeOptions={[3, 5, 10]}
      striped
    />
  );
}
`;

const columns = [
    { accessor: 'name', title: '姓名' },
    { accessor: 'department', title: '部门' },
    { accessor: 'salary', title: '薪资', textAlign: 'right' as const }
]

function Demo() {
    return (
        <DataTable
            columns={columns}
            records={employees.slice(0, 3)}
            total={45}
            rowKey={record => record.id}
            pageSizeOptions={[3, 5, 10]}
            striped
        />
    );
}

export const pagination: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
