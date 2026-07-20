// dumi 自动加载的全局脚本，会在客户端运行时执行。
// 引入 react-ui 的全部样式（CSS 变量 + 所有组件的 CSS module 合并产物）。
// 注意：必须用相对路径——@react-ui/ui/style.css 这种子路径导入在 mako 下解析不稳定。
import '../../../packages/ui/es/style.css';
// 引入 prismjs 代码高亮主题（DemoEngine 的 DemoCode 组件需要）
import 'prismjs/themes/prism.css';
