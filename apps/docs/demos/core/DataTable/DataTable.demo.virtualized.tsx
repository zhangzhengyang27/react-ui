import { DataTable } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { generateEmployees } from './_data';

const code = `
import { DataTable } from '@xiaoye-react/ui';

// generateEmployees(10000) 生成 1 万条模拟数据

function Demo() {
  return (
    <DataTable
      columns={[
        { accessor: 'id', title: '工号', width: 100 },
        { accessor: 'name', title: '姓名', width: 120 },
        { accessor: 'department', title: '部门', width: 120 },
        { accessor: 'city', title: '城市', width: 120 },
        { accessor: 'salary', title: '薪资', width: 120, textAlign: 'right' },
      ]}
      records={generateEmployees(10000)}
      virtualized
      maxHeight={360}
      estimatedRowHeight={42}
      rowKey={(record) => record.id}
      striped
    />
  );
}
`;

const columns = [
    { accessor: 'id', title: '工号', width: 100 },
    { accessor: 'name', title: '姓名', width: 120 },
    { accessor: 'department', title: '部门', width: 120 },
    { accessor: 'city', title: '城市', width: 120 },
    { accessor: 'salary', title: '薪资', width: 120, textAlign: 'right' as const }
]

const records = generateEmployees(10000);

function Demo() {
    return (
        <DataTable
            columns={columns}
            records={records}
            virtualized
            maxHeight={360}
            estimatedRowHeight={42}
            rowKey={record => record.id}
            striped
        />
    );
}

export const virtualized: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
