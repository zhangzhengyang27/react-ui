import { Cascader } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { asyncOrgData, fetchOrgChildren } from './_data';

const code = `
import { Cascader } from '@xiaoye-react/ui';

// 标记 hasChildren 的节点在展开时触发 loadData
const orgData = [
  { value: 'rd', label: '研发中心', hasChildren: true },
  { value: 'design', label: '设计中心', hasChildren: true },
];

const fetchChildren = (node) =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ value: node.value + '-1', label: node.label + ' · 一组' }]), 600)
  );

function Demo() {
  return (
    <Cascader
      data={orgData}
      loadData={fetchChildren}
      placeholder="点开节点体验懒加载"
    />
  );
}
`;

function Demo() {
    return <Cascader data={asyncOrgData} loadData={fetchOrgChildren} placeholder="点开节点体验懒加载" />;
}

export const lazyLoad: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
