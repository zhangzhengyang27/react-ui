import { DataTable } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { employees } from './_data';

const code = `
import { DataTable } from '@xiaoye-react/ui';

const employees = [
  { id: 'E-1001', name: '张伟', department: '研发部', city: '杭州', salary: 24500, onboard: '2019-03-11' },
  { id: 'E-1002', name: '李静', department: '产品设计', city: '上海', salary: 19800, onboard: '2020-07-01' },
  { id: 'E-1003', name: '王强', department: '研发部', city: '北京', salary: 28600, onboard: '2018-11-26' },
];

const columns = [
  { accessor: 'name', title: '姓名' },
  { accessor: 'department', title: '部门' },
  { accessor: 'city', title: '城市' },
  { accessor: 'salary', title: '薪资', textAlign: 'right', render: (record) => \`¥\${record.salary.toLocaleString()}\` },
  { accessor: 'onboard', title: '入职日期' },
];

function Demo() {
  return <DataTable columns={columns} records={employees} rowKey={(record) => record.id} />;
}
`;

const columns = [
    { accessor: 'name', title: '姓名' },
    { accessor: 'department', title: '部门' },
    { accessor: 'city', title: '城市' },
    {
        accessor: 'salary',
        title: '薪资',
        textAlign: 'right' as const,
        render: (record: (typeof employees)[number]) => `¥${record.salary.toLocaleString()}`
    },
    { accessor: 'onboard', title: '入职日期' }
];

function Demo() {
    return <DataTable columns={columns} records={employees} rowKey={record => record.id} />;
}

export const usage: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
