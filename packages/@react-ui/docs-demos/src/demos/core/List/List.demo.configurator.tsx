import { List, ListProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: ListProps) {
  return (
    <List {...props}>
      <List.Item>从 GitHub 克隆或下载仓库</List.Item>
      <List.Item>使用 yarn 安装依赖</List.Item>
      <List.Item>要启动开发服务器，请运行 npm start 命令</List.Item>
      <List.Item>运行测试以确保你的更改不会破坏构建</List.Item>
      <List.Item>完成后提交拉取请求</List.Item>
    </List>
  );
}

const code = `
import { List } from '@react-ui/ui';

function Demo() {
  return (
    <List{{props}}>
      <List.Item>从 GitHub 克隆或下载仓库</List.Item>
      <List.Item>使用 yarn 安装依赖</List.Item>
      <List.Item>要启动开发服务器，请运行 npm start 命令</List.Item>
      <List.Item>运行测试以确保你的更改不会破坏构建</List.Item>
      <List.Item>完成后提交拉取请求</List.Item>
    </List>
  );
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'type',
      type: 'segmented',
      data: [
        { value: 'unordered', label: 'Unordered' },
        { value: 'ordered', label: 'Ordered' },
      ],
      initialValue: 'unordered',
      libraryValue: 'unordered',
    },
    { prop: 'size', type: 'size', libraryValue: 'md', initialValue: 'md' },
    { prop: 'withPadding', type: 'boolean', libraryValue: false, initialValue: false },
  ],
};
