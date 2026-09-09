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
      ]}
      records={employees}
      rowKey={(record) => record.id}
      renderExpanded={(record) => (
        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
          工号：{record.id} ｜ 入职日期：{record.onboard} ｜ 薪资：¥{record.salary.toLocaleString()}
        </div>
      )}
      defaultExpandedRows={['E-1001']}
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
    return (
        <DataTable
            columns={columns}
            records={employees}
            rowKey={record => record.id}
            renderExpanded={record => (
                <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                    工号：{record.id} ｜ 入职日期：{record.onboard} ｜ 薪资：¥{record.salary.toLocaleString()}
                </div>
            )}
            defaultExpandedRows={['E-1001']}
        />
    );
}

export const rowExpansion: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
