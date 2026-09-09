import { Cascader } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { regionOptions } from './_data';

const code = `
import { Cascader } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Cascader
      data={regionOptions}
      searchable
      clearable
      placeholder="搜索叶子节点，如：西湖"
      nothingFoundMessage="没有匹配的地区"
    />
  );
}
`;

function Demo() {
    return (
        <Cascader
            data={regionOptions}
            searchable
            clearable
            placeholder="搜索叶子节点，如：西湖"
            nothingFoundMessage="没有匹配的地区"
        />
    );
}

export const searchable: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
