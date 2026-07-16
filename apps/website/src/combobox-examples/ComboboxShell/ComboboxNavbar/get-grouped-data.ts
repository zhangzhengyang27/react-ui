import { ComboboxExample } from '@react-ui/docs-demos';

export interface ComboboxExamplesGroup {
  group: string;
  items: ComboboxExample[];
}

export function getGroupedData(data: ComboboxExample[]): ComboboxExamplesGroup[] {
  const items: Record<ComboboxExample['type'], ComboboxExample[]> = {
    select: [],
    autocomplete: [],
    multiselect: [],
    dropdown: [],
    button: [],
    animations: [],
    virtualization: [],
    treeselect: [],
    other: [],
  };

  data.forEach((item) => {
    items[item.type].push(item);
  });

  return [
    { group: '选择', items: items.select },
    { group: '自动完成', items: items.autocomplete },
    { group: '多选', items: items.multiselect },
    { group: '按钮', items: items.button },
    { group: '下拉', items: items.dropdown },
    { group: '动画', items: items.animations },
    { group: '虚拟化', items: items.virtualization },
    { group: '树选择', items: items.treeselect },
    { group: '其他', items: items.other },
  ];
}
