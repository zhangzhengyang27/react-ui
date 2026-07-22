import { CheckCircleIcon, CircleDashedIcon } from '@phosphor-icons/react';
import { List, ThemeIcon } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { List, ThemeIcon } from '@xiaoye-react/ui';
import { CheckCircleIcon, CircleDashedIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <CheckCircleIcon size={16} />
        </ThemeIcon>
      }
    >
      <List.Item>从 GitHub 克隆或下载仓库</List.Item>
      <List.Item>使用 yarn 安装依赖</List.Item>
      <List.Item>要启动开发服务器，请运行 npm start 命令</List.Item>
      <List.Item>运行测试以确保你的更改不会破坏构建</List.Item>
      <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <CircleDashedIcon size={16} />
          </ThemeIcon>
        }
      >
        Submit a pull request once you are done
      </List.Item>
    </List>
  );
}
`;

function Demo() {
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <CheckCircleIcon size={16} />
        </ThemeIcon>
      }
    >
      <List.Item>从 GitHub 克隆或下载仓库</List.Item>
      <List.Item>使用 yarn 安装依赖</List.Item>
      <List.Item>要启动开发服务器，请运行 npm start 命令</List.Item>
      <List.Item>运行测试以确保你的更改不会破坏构建</List.Item>
      <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <CircleDashedIcon size={16} />
          </ThemeIcon>
        }
      >
        Submit a pull request once you are done
      </List.Item>
    </List>
  );
}

export const icon: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 500,
  component: Demo,
  code,
};
