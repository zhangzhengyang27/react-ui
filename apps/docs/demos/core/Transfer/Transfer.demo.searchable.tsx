import { Transfer } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Transfer } from '@xiaoye-react/ui';

const members = [
  { value: 'zhangwei', label: '张伟（研发部）' },
  { value: 'lijing', label: '李静（产品设计）' },
  { value: 'wangqiang', label: '王强（研发部）' },
  { value: 'zhaomin', label: '赵敏（市场部）' },
  { value: 'chenchen', label: '陈晨（人力资源）' },
];

function Demo() {
  return (
    <Transfer
      data={members}
      searchable
      defaultValue={['zhangwei']}
      titles={['全部成员', '项目成员']}
    />
  );
}
`;

const members = [
    { value: 'zhangwei', label: '张伟（研发部）' },
    { value: 'lijing', label: '李静（产品设计）' },
    { value: 'wangqiang', label: '王强（研发部）' },
    { value: 'zhaomin', label: '赵敏（市场部）' },
    { value: 'chenchen', label: '陈晨（人力资源）' }
]

function Demo() {
    return (
        <Transfer data={members} searchable defaultValue={['zhangwei']} titles={['全部成员', '项目成员']} />
    );
}

export const searchable: UIDemo = { type: 'code', code, component: Demo };
