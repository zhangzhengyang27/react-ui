import { COMBOBOX_EXAMPLES_COMPONENTS } from './examples';

export interface ComboboxExample {
  /** Demo id, based on it component will render component on the page */
  id: keyof typeof COMBOBOX_EXAMPLES_COMPONENTS;

  /** Name used in search */
  name: string;

  /** Short component description, used in search */
  description: string;

  /** Full component description, displayed on the page */
  fullDescription?: string;

  /** Type based on which components are ordered in the navbar, also used for filtering */
  type:
    | 'select'
    | 'autocomplete'
    | 'multiselect'
    | 'dropdown'
    | 'button'
    | 'animations'
    | 'virtualization'
    | 'treeselect'
    | 'other';
}

export const COMBOBOX_EXAMPLES_DATA: ComboboxExample[] = [
  {
    id: 'BasicSelect',
    name: '基础选择',
    description: '基础选择组件',
    type: 'select',
  },
  {
    id: 'SelectActive',
    name: '带活动选项的选择',
    description: '下拉列表中高亮当前选项',
    type: 'select',
  },
  {
    id: 'SearchableSelect',
    name: '可搜索选择',
    description: '可搜索的选择',
    type: 'select',
  },
  {
    id: 'SelectLimit',
    name: '带选项限制的选择',
    description: '10 万个选项的可搜索选择',
    fullDescription:
      '限制同时渲染的选项数量是处理大数据集最有效的方式。下面的示例展示了如何使用 limit 属性，在 100,000 条数据集中搜索时每次只渲染 7 个选项。',
    type: 'select',
  },
  {
    id: 'SelectOptionComponent',
    name: '自定义选项的选择',
    description: '自定义选项和值组件的选择',
    type: 'select',
  },
  {
    id: 'SelectAsync',
    name: '异步数据选择',
    description: '仅在打开下拉时请求数据',
    type: 'select',
  },
  {
    id: 'SelectClearable',
    name: '带清除按钮选择',
    description: '可清除的选择',
    type: 'select',
  },
  {
    id: 'SelectDropdownSearch',
    name: '下拉搜索选择',
    description: '下拉列表中带搜索输入的选择',
    type: 'select',
  },
  {
    id: 'SelectOptionOnHover',
    name: '悬停选择选项',
    description: '将选中项移动到悬停选项',
    fullDescription:
      '将选中项移动到悬停选项可以在结合鼠标和键盘交互时非常有用。',
    type: 'select',
  },
  {
    id: 'SelectGroups',
    name: '选项分组',
    description: '带选项分组的选择',
    type: 'select',
  },
  {
    id: 'SelectGroupsSearchable',
    name: '分组可搜索选择',
    description: '分组数据的选项过滤',
    type: 'select',
  },
  {
    id: 'SelectGroupsStyles',
    name: '自定义分组样式',
    description: '使用 Styles API 自定义分组样式',
    type: 'select',
  },
  {
    id: 'SelectCreatable',
    name: '可创建选择',
    description: '可创建新选项的选择',
    type: 'select',
  },
  {
    id: 'BasicAutocomplete',
    name: '基础自动完成',
    description: '基础自动完成组件',
    type: 'autocomplete',
  },
  {
    id: 'AutocompleteLimit',
    name: '带选项限制自动完成',
    description: '10 万个选项搜索',
    fullDescription:
      '限制同时渲染的选项数量是处理大数据集最有效的方式。下面的示例展示了如何使用 limit 属性，在 100,000 条数据集中搜索时每次只渲染 7 个选项。',
    type: 'autocomplete',
  },
  {
    id: 'AsyncAutocomplete',
    name: '异步自动完成',
    description: '异步数据的自动完成',
    type: 'autocomplete',
  },
  {
    id: 'AutocompleteHighlight',
    name: '高亮自动完成',
    description: '选项中高亮搜索词的自动完成',
    type: 'autocomplete',
  },
  {
    id: 'AutocompleteSelectFirstOption',
    name: '输入时选中首项',
    description: '用户输入时自动选中第一项的自动完成',
    type: 'autocomplete',
  },
  {
    id: 'AutocompleteDynamic',
    name: '动态选项',
    description: '选项依赖用户输入的自动完成',
    type: 'autocomplete',
  },
  {
    id: 'AutocompleteClearable',
    name: '可清除自动完成',
    description: '带清除按钮的自动完成',
    type: 'autocomplete',
  },
  {
    id: 'BasicButton',
    name: '基础按钮',
    description: '按钮目标的基础 Combobox',
    type: 'button',
  },
  {
    id: 'ButtonSearch',
    name: '下拉搜索按钮',
    description: '下拉列表中带搜索输入的按钮',
    type: 'button',
  },
  {
    id: 'ButtonMultiSelect',
    name: '按钮多选',
    description: '可多选的按钮',
    type: 'button',
  },
  {
    id: 'DropdownScroll',
    name: '下拉滚动',
    description: '使用原生滚动条的下拉',
    type: 'dropdown',
  },
  {
    id: 'DropdownScrollArea',
    name: '带 ScrollArea 下拉',
    description: '使用 ScrollArea.Autosize 滚动条的下拉',
    type: 'dropdown',
  },
  {
    id: 'DropdownHeader',
    name: '带头部下拉',
    description: '带头部和 ScrollArea 的下拉',
    type: 'dropdown',
  },
  {
    id: 'DropdownFooter',
    name: '带底部下拉',
    description: '带底部和 ScrollArea 的下拉',
    type: 'dropdown',
  },
  {
    id: 'DropdownPositionStyles',
    name: '自定义样式下拉',
    description: '使用 Styles API 更改下拉样式',
    type: 'dropdown',
  },
  {
    id: 'SelectedStyles',
    name: '自定义已选样式',
    description: '自定义已选选项样式',
    type: 'dropdown',
  },
  {
    id: 'DropdownOptionsAnimation',
    name: '选项动画下拉',
    description: '下拉打开时播放选项动画',
    type: 'animations',
  },
  {
    id: 'SelectedAnimation',
    name: '选中选项动画',
    description: '选中选项时播放动画',
    type: 'animations',
  },
  {
    id: 'DropdownSmoothScroll',
    name: '平滑滚动',
    description: '键盘导航时平滑滚动选项',
    type: 'animations',
  },
  {
    id: 'BasicMultiSelect',
    name: '基础多选',
    description: '基础多选组件',
    type: 'multiselect',
  },
  {
    id: 'SearchableMultiSelect',
    name: '可搜索多选',
    description: '可搜索的多选',
    type: 'multiselect',
  },
  {
    id: 'MaxSelectedItems',
    name: '最大已选选项',
    description: '限制最多可选选项数',
    type: 'multiselect',
  },
  {
    id: 'MultiSelectCheckbox',
    name: '带复选框多选',
    description: '带复选框的多选选项',
    type: 'multiselect',
  },
  {
    id: 'ActiveOptionsFilter',
    name: '隐藏已选选项',
    description: '从下拉中移除已选选项',
    type: 'multiselect',
  },
  {
    id: 'MaxDisplayedItems',
    name: '最大显示值',
    description: '限制最多可显示值数量',
    type: 'multiselect',
  },
  {
    id: 'MultiSelectValueRenderer',
    name: '自定义值胶囊',
    description: '使用自定义组件渲染已选值',
    type: 'multiselect',
  },
  {
    id: 'MultiSelectCreatable',
    name: '可创建多选',
    description: '可创建新选项的多选',
    type: 'multiselect',
  },
  {
    id: 'ReorderablePillsMultiSelect',
    name: '可重排序胶囊多选',
    description: '可拖放重新排序胶囊的多选',
    fullDescription:
      '使用 Combobox 原语和 usePillsReorder 钩子构建。每个胶囊都可拖动，将一个胶囊放到另一个前后会自动重新排序值数组。',
    type: 'multiselect',
  },
  {
    id: 'SelectList',
    name: '内联选项列表',
    description: '带复选框的内联列表',
    type: 'other',
  },
  {
    id: 'TransferList',
    name: '穿梭列表',
    description: '可搜索的穿梭列表',
    type: 'other',
  },
  {
    id: 'VirtualizedTanstack',
    name: '虚拟化选择（TanStack）',
    description: '使用 @tanstack/react-virtual 的虚拟化选项列表',
    type: 'virtualization',
  },
  {
    id: 'VirtualizedSearchableTanstack',
    name: '可搜索虚拟化选择（TanStack）',
    description: '使用 @tanstack/react-virtual 的可搜索虚拟化选项列表',
    type: 'virtualization',
  },
  {
    id: 'VirtualizedOptions',
    name: '虚拟化选择（react-virtuoso）',
    description: '使用 react-virtuoso 的虚拟化选项列表',
    type: 'virtualization',
  },
  {
    id: 'TreeSelectCombobox',
    name: '树选择',
    description: 'Select with expandable tree options',
    fullDescription:
      '使用 Combobox 原语构建的树选择。有子节点的节点可以展开或折叠，并带连接线。',
    type: 'treeselect',
  },
  {
    id: 'TreeMultiSelectCombobox',
    name: '树多选',
    description: '带树形层级和复选框的多选',
    fullDescription:
      '带复选框指示器的多选树。选中父节点会选中所有子节点。支持部分选中分组的不确定状态。',
    type: 'treeselect',
  },
  {
    id: 'TreeSelectSearchable',
    name: '可搜索树选择',
    description: '可搜索过滤的树选择',
    fullDescription:
      '可搜索的树选择，在你输入时过滤节点。匹配的节点及其祖先会显示，所有父分组自动展开。',
    type: 'treeselect',
  },
  {
    id: 'TreeSelectCheckbox',
    name: '带复选框树选择',
    description: '带复选框指示器和点击展开的单选树',
    fullDescription:
      '带复选框指示器的树选择。点击父节点可展开或折叠，点击叶节点可选中。',
    type: 'treeselect',
  },
  {
    id: 'TreeSelectVirtualized',
    name: '虚拟化树选择',
    description: '大数据集的虚拟化树选择',
    fullDescription:
      '使用 @tanstack/react-virtual 的虚拟化树选择，可高效渲染约 500 个节点的大树。支持通过 V 形图标展开/折叠。',
    type: 'treeselect',
  },
];
