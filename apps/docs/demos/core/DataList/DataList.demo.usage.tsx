import { DataList } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const data = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Software Engineer' },
  { label: 'Location', value: 'San Francisco, CA' },
];

function Wrapper(props: any) {
  return (
    <DataList {...props}>
      {data.map((item) => (
        <DataList.Item key={item.label}>
          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
          <DataList.ItemValue>{item.value}</DataList.ItemValue>
        </DataList.Item>
      ))}
    </DataList>
  );
}

const code = `
import { DataList } from '@react-ui/ui';

const data = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Software Engineer' },
  { label: 'Location', value: 'San Francisco, CA' },
];

function Demo() {
  return (
    <DataList{{props}}>
      {data.map((item) => (
        <DataList.Item key={item.label}>
          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
          <DataList.ItemValue>{item.value}</DataList.ItemValue>
        </DataList.Item>
      ))}
    </DataList>
  );
}
`;

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { prop: 'size', type: 'size', libraryValue: 'md', initialValue: 'md' },
    {
      prop: 'orientation',
      type: 'segmented',
      data: [
        { value: 'vertical', label: '垂直' },
        { value: 'horizontal', label: '水平' },
      ],
      initialValue: 'vertical',
      libraryValue: 'vertical',
    },
    { prop: 'withDivider', type: 'boolean', libraryValue: false, initialValue: false },
  ],
};
