import { meta } from '@react-ui/mantine-meta';
import { LinksGroupProps } from './LinksGroup/LinksGroup';

export const FOOTER_LINKS_DATA: LinksGroupProps[] = [
  {
    title: '关于',
    data: [
      { type: 'next', label: '项目介绍', link: '/about' },
      { type: 'next', label: '参与贡献', link: '/contribute' },
      { type: 'link', label: 'GitHub Releases', link: meta.gitHubLinks.releases },
    ],
  },

  {
    title: '社区',
    data: [
      { type: 'link', label: 'GitHub Discussions', link: meta.gitHubLinks.discussions },
      { type: 'next', label: '支持与反馈', link: '/support' },
      { type: 'next', label: '浏览器支持', link: '/browser-support' },
    ],
  },
  {
    title: '项目',
    data: [
      { type: 'link', label: 'GitHub 仓库', link: meta.gitHubLinks.reactui },
      { type: 'link', label: 'GitHub 组织', link: meta.gitHubLinks.organization },
      { type: 'link', label: 'npm 包', link: meta.npmLink },
    ],
  },
];
