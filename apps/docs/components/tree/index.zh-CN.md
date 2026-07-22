---
category: Components
title: Tree
subtitle: 树形控件
description: react-ui Tree 树形控件组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要以树形结构展示层级数据，支持展开/收起、选择、拖拽时使用。

## 代码演示 {#examples}

### 用法

`Tree` 组件用于显示层级数据。`Tree` 组件默认具有最少的样式；可使用 [Styles API](/docs/styles/styles-api) 自定义样式。

<code src="./demo/usage.tsx"></code>

### Data 属性

传给 `data` 属性的数据应遵循以下规则：

- 数据必须是稳定的引用（memoized）
- 数据必须是数组
- 数组中的每一项代表树中的一个节点
- 每个节点必须是具有 `value` 和 `label` 键的对象
- 每个节点可以有一个 `children` 键，值为子节点数组
- 每个节点的 `value` 必须唯一

有效数据示例：


无效数据示例：

```tsx
// ✅ Valid data, all values are unique
const data = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/components', label: 'components' },
      { value: 'src/hooks', label: 'hooks' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
];
```

```tsx
// ❌ Invalid data, values are not unique (components is used twice)
const data = [
  {
    value: 'src',
    label: 'src',
    children: [{ value: 'components', label: 'components' }],
  },
  { value: 'components', label: 'components' },
];
```

### 数据类型

可导入 `TreeNodeData` 类型来定义树的数据类型：

```tsx
import { TreeNodeData } from '@xiaoye-react/ui';

const data: TreeNodeData[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/components', label: 'components' },
      { value: 'src/hooks', label: 'hooks' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
];
```

### renderNode

使用 `renderNode` 属性自定义节点渲染。`renderNode` 函数接收一个对象作为单一参数，该对象具有以下属性：

```tsx
export interface RenderTreeNodePayload {
  /** 节点在树中的层级 */
  level: number;

  /** 节点是否展开，仅适用于有 `children` 的节点 */
  expanded: boolean;

  /** 节点是否有非空的 `children` 数组或 `hasChildren` 设置为 `true` */
  hasChildren: boolean;

  /** 节点是否被选中 */
  selected: boolean;

  /** 节点的子节点是否正在加载 */
  isLoading: boolean;

  /** 上次加载失败的错误，或 `null` */
  loadError: Error | null;

  /** 来自 `Tree` 的 `data` 属性的节点数据 */
  node: TreeNodeData;

  /** 树控制器实例，`useTree` Hook 的返回值 */
  tree: TreeController;

  /** 要展开到根节点元素的属性 */
  elementProps: {
    className: string;
    style: React.CSSProperties;
    onClick: (event: React.MouseEvent) => void;
    'data-selected': boolean | undefined;
    'data-value': string;
  };

  /** 当 `Tree` 上设置了 `withDragHandle` 时，要展开到拖动把手元素的属性，
   * 否则为 `undefined` */
  dragHandleProps: { onMouseDown: (event: React.MouseEvent) => void } | undefined;
}
```

<code src="./demo/renderNode.tsx"></code>

### useTree hook

`useTree` Hook 可用于控制树的选中和展开状态。

该 Hook 接受一个具有以下属性的对象：


并返回一个具有以下属性的对象：


可将 `useTree` Hook 返回的值传给 `Tree` 组件的 `tree` 属性以控制树状态：

```tsx
export interface UseTreeInput {
  /** 所有节点的初始展开状态，非受控状态 */
  initialExpandedState?: TreeExpandedState;

  /** 所有节点的展开状态，受控状态 */
  expandedState?: TreeExpandedState;

  /** 树展开状态变化时调用 */
  onExpandedStateChange?: (expandedState: TreeExpandedState) => void;

  /** 节点的初始选中状态 */
  initialSelectedState?: string[];

  /** 所有节点的选中状态，受控状态 */
  selectedState?: string[];

  /** 树选中状态变化时调用 */
  onSelectedStateChange?: (selectedState: string[]) => void;

  /** 节点的初始勾选状态 */
  initialCheckedState?: string[];

  /** 所有节点的勾选状态，受控状态 */
  checkedState?: string[];

  /** 树勾选状态变化时调用 */
  onCheckedStateChange?: (checkedState: string[]) => void;

  /** 是否可同时选中多个节点 */
  multiple?: boolean;

  /** 节点展开时以其 value 调用 */
  onNodeExpand?: (value: string) => void;

  /** 节点收起时以其 value 调用 */
  onNodeCollapse?: (value: string) => void;

  /** 当 `hasChildren: true` 的节点首次展开时调用 */
  onLoadChildren?: (nodeValue: string) => Promise<void>;

  /** 当 `true` 时，勾选父节点不会影响子节点，反之亦然。
   * 每个节点的勾选状态完全独立。 @default false
   */
  checkStrictly?: boolean;
}
```

```tsx
export interface UseTreeReturnType {
  /** 当 `true` 时，每个节点的勾选状态独立（无父子级联） */
  checkStrictly: boolean;

  /** 是否可同时选中多个节点 */
  multiple: boolean;

  /** 以 `node.value` 和布尔值表示节点展开状态的对象 */
  expandedState: TreeExpandedState;

  /** 选中节点 value 的数组 */
  selectedState: string[];

  /** 勾选节点 value 的数组 */
  checkedState: string[];

  /** 最后点击的节点 value
   * 锚点节点用于多选时确定选中的范围
   */
  anchorNode: string | null;

  /** 根据提供的数据初始化树状态，由 Tree 组件自动调用 */
  initialize: (data: TreeNodeData[]) => void;

  /** 切换指定 value 节点的展开状态 */
  toggleExpanded: (value: string) => void;

  /** 收起指定 value 的节点 */
  collapse: (value: string) => void;

  /** 展开指定 value 的节点 */
  expand: (value: string) => void;

  /** 展开所有节点 */
  expandAllNodes: () => void;

  /** 收起所有节点 */
  collapseAllNodes: () => void;

  /** 设置展开状态 */
  setExpandedState: React.Dispatch<
    React.SetStateAction<TreeExpandedState>
  >;

  /** 切换指定 value 节点的选中状态 */
  toggleSelected: (value: string) => void;

  /** 选中指定 value 的节点 */
  select: (value: string) => void;

  /** 取消选中指定 value 的节点 */
  deselect: (value: string) => void;

  /** 清空选中状态 */
  clearSelected: () => void;

  /** 设置选中状态 */
  setSelectedState: React.Dispatch<React.SetStateAction<string[]>>;

  /** 勾选指定 value 的节点 */
  checkNode: (value: string) => void;

  /** 取消勾选指定 value 的节点 */
  uncheckNode: (value: string) => void;

  /** 勾选所有节点 */
  checkAllNodes: () => void;

  /** 取消勾选所有节点 */
  uncheckAllNodes: () => void;

  /** 设置勾选状态 */
  setCheckedState: React.Dispatch<React.SetStateAction<string[]>>;

  /** 返回所有带状态的勾选节点 */
  getCheckedNodes: () => CheckedNodeStatus[];

  /** 如果指定 value 的节点已勾选，返回 `true` */
  isNodeChecked: (value: string) => boolean;

  /** 如果指定 value 的节点处于不确定状态，返回 `true` */
  isNodeIndeterminate: (value: string) => boolean;

  /** 如果节点的子节点正在加载，返回 `true` */
  isNodeLoading: (value: string) => boolean;

  /** 返回上次加载失败的错误，或 `null` */
  getNodeLoadError: (value: string) => Error | null;

  /** 以编程方式触发节点子节点的加载 */
  loadNode: (value: string) => Promise<void>;

  /** 清除节点的已加载缓存，使其在下次展开时重新获取 */
  invalidateNode: (value: string) => void;
}
```

<code src="./demo/controller.tsx"></code>

### 勾选状态

`Tree` 可用于显示带复选框的勾选状态。要实现勾选状态，需在 `renderNode` 函数中渲染 `Checkbox.Indicator`：


要勾选/取消勾选节点，请使用 `checkAllNodes` 和 `uncheckAllNodes` 函数：

<code src="./demo/checked.tsx"></code>

<code src="./demo/checkAllNodes.tsx"></code>

### 严格勾选

默认情况下，勾选父节点也会勾选其所有子节点（取消勾选同理）。在 `useTree` 上设置 `checkStrictly: true` 可使每个节点的勾选状态完全独立——勾选父节点不会影响子节点，反之亦然。在此模式下，`isNodeIndeterminate` 始终返回 `false`。

<code src="./demo/checkStrictly.tsx"></code>

### 初始展开状态

展开状态是一个以 `node.value` 为键、布尔值表示节点展开状态的对象。要更改初始展开状态，请向 `useTree` Hook 传入 `initialExpandedState`。要根据数据生成展开状态，可使用 `getTreeExpandedState` 函数：它接受数据和一个展开的节点 value 数组，并返回展开状态对象。

如果 `'*'` 作为第二个参数传给 `getTreeExpandedState`，所有节点都会展开：

```tsx
import { getTreeExpandedState } from '@xiaoye-react/ui';

// 展开两个给定节点
getTreeExpandedState(data, ['src', 'src/components']);

// 展开所有节点
getTreeExpandedState(data, '*');
```

<code src="./demo/expandedState.tsx"></code>

### 异步加载

`Tree` 支持子节点的懒加载。在节点上设置 `hasChildren: true` 而不提供 `children`——当节点首次展开时，会调用传给 `useTree` 的 `onLoadChildren` 回调。使用 `mergeAsyncChildren` 工具将加载的子节点拼接进对应的数据：


`renderNode` 负载包含 `isLoading` 和 `loadError` 字段，可用它们显示加载指示器或错误消息。使用 `tree.invalidateNode(value)` 清除节点的缓存，并允许在下次展开时重新获取。

```tsx
import { mergeAsyncChildren, Tree, TreeNodeData, useTree } from '@xiaoye-react/ui';

function Demo() {
  const [data, setData] = useState<TreeNodeData[]>([
    { label: 'Documents', value: 'documents', hasChildren: true },
  ]);

  const tree = useTree({
    onLoadChildren: async (value) => {
      const children = await fetchChildren(value);
      setData((prev) => mergeAsyncChildren(prev, value, children));
    },
  });

  return <Tree data={data} tree={tree} />;
}
```

<code src="./demo/asyncLoading.tsx"></code>

### 搜索与过滤

`Tree` 不包含内置搜索控件——搜索输入和过滤逻辑始终由外部提供。使用 `filterTreeData` 工具根据搜索查询过滤树数据。该函数接受树数据、查询字符串和可选的自定义过滤函数：


默认过滤器将查询与 `node.label`（为字符串时）比较，否则回退到 `node.value`。匹配节点及其祖先会保留在结果中。可提供自定义的 `TreeNodeFilter` 函数以实现更高级的匹配（例如使用 fuse.js 进行模糊搜索）。

### 高亮匹配节点

在此示例中，所有节点保持可见，匹配文本在 `renderNode` 内使用 `Highlight` 组件高亮显示。匹配节点的祖先节点会自动展开。


### 过滤非匹配节点

在此示例中，使用 `filterTreeData` 移除非匹配分支。使用 `getTreeExpandedState(filteredData, '*')` 自动展开过滤后的树。


### 使用 fuse.js 进行模糊搜索

可向 `filterTreeData` 传入自定义过滤函数以实现模糊匹配。此示例使用 [fuse.js](https://www.fusejs.io/)：

```tsx
import { filterTreeData } from '@xiaoye-react/ui';

// 使用默认的不区分大小写 label 匹配进行过滤
const filtered = filterTreeData(data, 'button');

// 使用自定义函数过滤
const filtered = filterTreeData(data, 'btn', (query, node) =>
  node.value.includes(query)
);
```

<code src="./demo/searchHighlight.tsx"></code>

<code src="./demo/searchFilter.tsx"></code>

<code src="./demo/searchFuzzy.tsx"></code>

### 拖放

`Tree` 组件支持节点的拖放重新排序。要启用它，请提供 `onDragDrop` 回调。该回调接收一个对象，包含 `draggedNode`（被拖动节点的 value）、`targetNode`（被放置到的节点的 value）和 `position`（`'before'`、`'after'` 或 `'inside'`）。

使用 `moveTreeNode` 工具函数根据拖放结果更新数据：


拖动到某个节点上时，放置位置由光标位置决定：
- **顶部区域** – 放置到目标节点之前（显示为上方线条）
- **中部区域** – 放置到目标节点内部作为子节点（显示为背景高亮，仅适用于有子节点的节点）
- **底部区域** – 放置到目标节点之后（显示为下方线条）

节点不能放置到它们自己的后代上。


### 限制放置目标

使用 `allowDrop` 属性禁止某些放置。该回调接收与 `onDragDrop` 相同的负载（`draggedNode`、`targetNode`、`position`），并应返回 `false` 以拒绝放置。返回 `false` 时，放置指示器会隐藏，浏览器会显示 "not-allowed" 光标，因此用户在释放鼠标前就能获得视觉反馈。


### 拖动把手

默认情况下，可以从节点的任意位置开始拖动。在 `Tree` 上设置 `withDragHandle`，将拖动开始限制在展开 `renderNode` 负载中的 `dragHandleProps` 的元素上。当节点包含会干扰拖动的交互控件（输入框、按钮）时，这非常有用。

```tsx
import { moveTreeNode, Tree, TreeNodeData } from '@xiaoye-react/ui';

function Demo() {
  const [data, setData] = useState<TreeNodeData[]>(initialData);

  return (
    <Tree
      data={data}
      onDragDrop={(payload) =>
        setData((current) => moveTreeNode(current, payload))
      }
    />
  );
}
```

<code src="./demo/dragDrop.tsx"></code>

<code src="./demo/dragDropAllow.tsx"></code>

<code src="./demo/dragDropHandle.tsx"></code>

### 连接线

设置 `withLines` 属性以显示展示父子关系的连接线。连接线会自动适应 `levelOffset` 间距。

<code src="./demo/lines.tsx"></code>

### 虚拟化

`Tree` 不依赖任何虚拟化库——虚拟化实现需自行提供。使用 `flattenTreeData` 工具根据当前展开状态将层级数据转换为可见节点的扁平列表，然后使用 `FlatTreeNode` 渲染每个节点，它提供 Tree 的样式、aria 属性、点击/键盘处理器和 `renderNode` 支持。


`FlatTreeNode` 接受与 `Tree` 相同的行为属性（`expandOnClick`、`selectOnClick`、`expandOnSpace`、`checkOnSpace`、`renderNode`）和一个用于虚拟定位器的 `style` 属性。容器元素必须具有 `data-tree-root` 和 `role="tree"` 属性，键盘导航才能正常工作。

```tsx
import { FlatTreeNode, flattenTreeData, useTree } from '@xiaoye-react/ui';

const tree = useTree();
const flatList = flattenTreeData(data, tree.expandedState);
// flatList 是 FlattenedTreeNodeData[] – 将每个条目展开到 FlatTreeNode
```

<code src="./demo/virtualized.tsx"></code>

### 示例：文件树

<code src="./demo/files.tsx"></code>

### 示例：文档导航编辑器

下面的示例将拖放、使用 `Highlight` 的搜索、单选、悬停显示的操作菜单、文件夹页面数量徽章和 `withLines` 组合到一个文档导航编辑器中。`renderNode` 回调会接收组件暴露的每个负载字段，因此大多数应用级 UX 都可以通过这些基础单元组装而成。

<code src="./demo/docsEditor.tsx"></code>



## API {#api}

### TreeProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树形数据 | `TreeNodeData[]` | `[]` |
| expanded | 当前展开项（受控） | `string[]` | — |
| onExpand | 展开回调 | `(expanded: string[]) => void` | — |
| selected | 当前选中项（受控） | `string[]` | — |
| onSelect | 选中回调 | `(selected: string[]) => void` | — |
| checkable | 是否可勾选 | `boolean` | `false` |
| draggable | 是否可拖拽 | `boolean` | `false` |
| levelOffset | 层级缩进 | `number` | `16` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
