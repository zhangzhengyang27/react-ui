import { DataList } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { DataListStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { DataList } from '@react-ui/ui';

function Demo() {
  return (
    <DataList{{props}}>
      <DataList.Item>
        <DataList.ItemLabel>姓名</DataList.ItemLabel>
        <DataList.ItemValue>张三</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>邮箱</DataList.ItemLabel>
        <DataList.ItemValue>john@example.com</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>角色</DataList.ItemLabel>
        <DataList.ItemValue>软件工程师</DataList.ItemValue>
      </DataList.Item>
    </DataList>
  );
}
`;

function Demo(props: any) {
  return (
    <DataList {...props}>
      <DataList.Item>
        <DataList.ItemLabel>姓名</DataList.ItemLabel>
        <DataList.ItemValue>张三</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>邮箱</DataList.ItemLabel>
        <DataList.ItemValue>john@example.com</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>角色</DataList.ItemLabel>
        <DataList.ItemValue>软件工程师</DataList.ItemValue>
      </DataList.Item>
    </DataList>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: DataListStylesApi,
  component: Demo,
  code,
  centered: true,
};
