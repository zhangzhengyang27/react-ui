export interface PackageItem {
  package: string;
  description: string;
  dependencies: string[];
}

export const PACKAGES_DATA: PackageItem[] = [
  {
    package: '@xiaoye-react/hooks',
    description: '状态与 UI 管理 Hooks',
    dependencies: ['@xiaoye-react/hooks'],
  },
  {
    package: '@xiaoye-react/ui',
    description: '核心组件库：输入框、按钮、浮层等',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui'],
  },
  {
    package: '@xiaoye-react/form',
    description: '表单管理库',
    dependencies: ['@xiaoye-react/form'],
  },
  {
    package: '@xiaoye-react/dates',
    description: '日期输入框与日历',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui', '@xiaoye-react/dates', 'dayjs'],
  },
  {
    package: '@xiaoye-react/notifications',
    description: '通知系统',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui', '@xiaoye-react/notifications'],
  },
  {
    package: '@xiaoye-react/code-highlight',
    description: '使用主题颜色与样式的代码高亮',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui', '@xiaoye-react/code-highlight'],
  },
  {
    package: '@xiaoye-react/tiptap',
    description: '基于 Tiptap 的富文本编辑器',
    dependencies: [
      '@xiaoye-react/hooks',
      '@xiaoye-react/ui',
      '@xiaoye-react/tiptap',
      '@tiptap/pm',
      '@tiptap/react',
      '@tiptap/extension-link',
      '@tiptap/starter-kit',
    ],
  },
  {
    package: '@xiaoye-react/dropzone',
    description: '支持拖拽上传的文件捕获',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui', '@xiaoye-react/dropzone'],
  },
  {
    package: '@xiaoye-react/carousel',
    description: '基于 Embla 的轮播组件',
    dependencies: [
      '@xiaoye-react/hooks',
      '@xiaoye-react/ui',
      '@xiaoye-react/carousel',
      'embla-carousel@^8.5.2',
      'embla-carousel-react@^8.5.2',
    ],
  },
  {
    package: '@xiaoye-react/spotlight',
    description: '覆盖式命令中心',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui', '@xiaoye-react/spotlight'],
  },
  {
    package: '@xiaoye-react/modals',
    description: '集中式模态框管理器',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui', '@xiaoye-react/modals'],
  },
  {
    package: '@xiaoye-react/nprogress',
    description: '导航进度条',
    dependencies: ['@xiaoye-react/hooks', '@xiaoye-react/ui', '@xiaoye-react/nprogress'],
  },
];
