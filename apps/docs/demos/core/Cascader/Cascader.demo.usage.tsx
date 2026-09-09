import { Cascader } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { regionOptions } from './_data';

const code = `
import { Cascader } from '@xiaoye-react/ui';

const regionOptions = [
  { value: 'zhejiang', label: '浙江', children: [
    { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }] },
  ] },
  { value: 'jiangsu', label: '江苏', children: [{ value: 'nanjing', label: '南京' }] },
];

function Demo() {
  return (
    <Cascader
      data={regionOptions}
      placeholder="请选择所在地区"
      clearable
    />
  );
}
`;

function Demo() {
    return <Cascader data={regionOptions} placeholder="请选择所在地区" clearable />;
}

export const usage: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
