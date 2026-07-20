export interface PackageItem {
  package: string;
  description: string;
  dependencies: string[];
}

export const PACKAGES_DATA: PackageItem[] = [
  {
    package: '@react-ui/hooks',
    description: '状态与 UI 管理 Hooks',
    dependencies: ['@react-ui/hooks'],
  },
  {
    package: '@react-ui/ui',
    description: '核心组件库：输入框、按钮、浮层等',
    dependencies: ['@react-ui/hooks', '@react-ui/ui'],
  },
  {
    package: '@react-ui/form',
    description: '表单管理库',
    dependencies: ['@react-ui/form'],
  },
  {
    package: '@react-ui/dates',
    description: '日期输入框与日历',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/dates', 'dayjs'],
  },
  {
    package: '@react-ui/charts',
    description: '基于 Recharts 的图表库',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/charts', 'recharts'],
  },
  {
    package: '@react-ui/notifications',
    description: '通知系统',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/notifications'],
  },
  {
    package: '@react-ui/code-highlight',
    description: '使用主题颜色与样式的代码高亮',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/code-highlight'],
  },
  {
    package: '@react-ui/tiptap',
    description: '基于 Tiptap 的富文本编辑器',
    dependencies: [
      '@react-ui/hooks',
      '@react-ui/ui',
      '@react-ui/tiptap',
      '@tiptap/pm',
      '@tiptap/react',
      '@tiptap/extension-link',
      '@tiptap/starter-kit',
    ],
  },
  {
    package: '@react-ui/dropzone',
    description: '支持拖拽上传的文件捕获',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/dropzone'],
  },
  {
    package: '@react-ui/carousel',
    description: '基于 Embla 的轮播组件',
    dependencies: [
      '@react-ui/hooks',
      '@react-ui/ui',
      '@react-ui/carousel',
      'embla-carousel@^8.5.2',
      'embla-carousel-react@^8.5.2',
    ],
  },
  {
    package: '@react-ui/spotlight',
    description: '覆盖式命令中心',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/spotlight'],
  },
  {
    package: '@react-ui/modals',
    description: '集中式模态框管理器',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/modals'],
  },
  {
    package: '@react-ui/nprogress',
    description: '导航进度条',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/nprogress'],
  },
];
