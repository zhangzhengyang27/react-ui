# @xiaoye-react/ui

> 小叶的 React 组件库，对标 Mantine 设计理念，提供完整的主题系统、表单、浮层、图表等 128+ 组件。

## 简介

`@xiaoye-react/ui` 是基于 React 19 的现代化组件库，具有以下特点：

- **主题系统**：完整的 CSS 变量主题，支持明暗双模式切换，可通过 `varsResolver` 灵活定制
- **组件丰富**：128+ 组件覆盖表单输入、选择器、浮层、导航、数据展示、反馈等场景
- **CSS Modules**：所有组件使用 CSS Modules + `--ui-*` CSS 变量，避免样式冲突
- **工厂模式**：统一的组件工厂 `factory`，支持 `withProps`、`staticComponents`、`classes`、`varsResolver`
- **类型安全**：TypeScript 5.5+，完整类型定义，props 继承 ElementProps 支持 HTML 原生属性
- **RTL 支持**：通过 `DirectionProvider` 提供 RTL 文字方向支持
- **图表集成**：内置 Area/Bar/Donut/Line/Sankey 等图表组件（基于 recharts）

## 安装

```bash
pnpm add @xiaoye-react/ui
# 或
npm install @xiaoye-react/ui
```

## 使用

```tsx
import { Button, TextInput, UIProvider } from '@xiaoye-react/ui'
import '@xiaoye-react/ui/style.css'

function App() {
    return (
        <UIProvider>
            <Button variant="filled">按钮</Button>
            <TextInput placeholder="请输入" />
        </UIProvider>
    )
}
```

## 主题定制

```tsx
import { UIProvider, createTheme } from '@xiaoye-react/ui'

const customTheme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md',
    fontFamily: 'Inter, sans-serif',
})

function App() {
    return (
        <UIProvider theme={customTheme} colorScheme="light">
            {/* 应用内容 */}
        </UIProvider>
    )
}
```

## 核心组件一览

| 类别 | 组件 |
|------|------|
| 表单输入 | Button、TextInput、Textarea、Checkbox、Radio、Switch、Select、Slider、RangeSlider、ColorInput、ColorPicker、FileInput、JsonInput、MaskInput、PinInput |
| 选择器 | Autocomplete、Combobox、MultiSelect、TagsInput、TreeSelect、SegmentedControl、Rating |
| 浮层 | Modal、Drawer、Dialog、Popover、Tooltip、HoverCard、Menu、ComboboxPopover |
| 导航 | Tabs、Accordion、Breadcrumbs、Pagination、NavLink、Stepper、Menubar |
| 数据展示 | Table、DataList、List、Tree、Timeline、Avatar、Badge、Chip、Card、Collapse |
| 反馈 | Alert、Notification、Loader、Progress、Skeleton、LoadingOverlay |
| 布局 | Box、Flex、Grid、Stack、Group、Container、SimpleGrid、AppShell |
| 图表 | AreaChart、BarChart、DonutChart、LineChart、SankeyChart |
| 交互 | ActionIcon、CopyButton、Chip、Burger、Affix、FloatingWindow |

## 技术栈

- React 19+
- TypeScript 5.5+
- Vite 5（构建产物为 ES Modules + 类型声明）
- CSS Modules（`--ui-*` CSS 变量）
- Floating UI（浮动定位）
- Embla（Carousel）

## License

MIT
