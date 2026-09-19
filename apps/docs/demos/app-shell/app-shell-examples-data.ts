import { APP_SHELL_EXAMPLES_COMPONENTS } from './examples';

export interface AppShellExample {
  /** Demo id, based on it component will render component on the page */
  id: keyof typeof APP_SHELL_EXAMPLES_COMPONENTS;

  /** Name used in search */
  name: string;

  /** Short component description, used in search */
  description: string;

  /** Full component description, displayed on the page */
  fullDescription?: string;
}

export const APP_SHELL_EXAMPLES_DATA: AppShellExample[] = [
  {
    id: 'BasicAppShell',
    name: '基础应用外壳',
    description: '带 Header 和 Navbar 的应用外壳',
  },
  {
    id: 'ResponsiveSizes',
    name: '响应式宽高',
    description: '响应式导航栏宽度和头部高度的应用外壳',
  },
  {
    id: 'MobileNavbar',
    name: '仅移动端导航栏',
    description: '仅在移动端显示导航栏的应用外壳',
  },
  {
    id: 'CollapseDesktop',
    name: '可折叠导航栏',
    description: '桌面端和移动端均可折叠导航栏的应用外壳',
  },
  {
    id: 'FullLayout',
    name: '全元素应用外壳',
    description: '导航栏、头部、侧边栏和页脚一起使用的应用外壳',
  },
  {
    id: 'AltLayout',
    name: '替代布局',
    description: '导航栏和侧边栏渲染在头部和页脚上方的应用外壳',
  },
  {
    id: 'NoTransitions',
    name: '无过渡',
    description: '禁用所有折叠/展开动画的应用外壳',
  },
  {
    id: 'Disabled',
    name: '禁用应用外壳',
    description: '使用 disabled 属性隐藏所有应用外壳元素',
  },
  {
    id: 'Headroom',
    name: '配合 use-headroom 使用',
    description: '向下滚动隐藏头部、向上滚动显示头部的应用外壳',
  },
  {
    id: 'StaticMode',
    name: '静态模式',
    description: '使用 CSS Grid 在正常文档流中渲染的应用外壳',
  },
  {
    id: 'NestedAppShell',
    name: '嵌套应用外壳',
    description: '固定应用外壳内嵌套静态应用外壳',
  },
];
