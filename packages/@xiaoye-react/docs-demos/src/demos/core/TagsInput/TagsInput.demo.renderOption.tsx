import { Group, TagsInput, TagsInputProps, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group, TagsInput, TagsInputProps, Text } from '@xiaoye-react/ui';

const data: Record<string, { emoji: string; description: string }> = {
  Apples: {
    emoji: '🍎',
    description: '脆爽多汁的美味零食',
  },
  Bread: {
    emoji: '🍞',
    description: '每日新鲜烘焙的必需品',
  },
  Bananas: {
    emoji: '🍌',
    description: '健康早餐的完美选择',
  },
  Eggs: {
    emoji: '🥚',
    description: '烹饪用的多功能蛋白质来源',
  },
  Broccoli: {
    emoji: '🥦',
    description: '营养丰富的绿色蔬菜',
  },
};

const renderTagsInputOption: TagsInputProps['renderOption'] = ({ option }) => (
  <Group>
    <Text span fz={24}>
      {data[option.value].emoji}
    </Text>
    <div>
      <Text>{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {data[option.value].description}
      </Text>
    </div>
  </Group>
);

function Demo() {
  return (
    <TagsInput
      data={['Apples', 'Bread', 'Bananas', 'Eggs', 'Broccoli']}
      renderOption={renderTagsInputOption}
      label="杂货"
      placeholder="从列表选择标签或输入添加"
      maxDropdownHeight={300}
    />
  );
}
`;

const data: Record<string, { emoji: string; description: string }> = {
  Apples: {
    emoji: '🍎',
    description: '脆爽多汁的美味零食',
  },
  Bread: {
    emoji: '🍞',
    description: '每日新鲜烘焙的必需品',
  },
  Bananas: {
    emoji: '🍌',
    description: '健康早餐的完美选择',
  },
  Eggs: {
    emoji: '🥚',
    description: '烹饪用的多功能蛋白质来源',
  },
  Broccoli: {
    emoji: '🥦',
    description: '营养丰富的绿色蔬菜',
  },
};

const renderTagsInputOption: TagsInputProps['renderOption'] = ({ option }) => (
  <Group>
    <Text span fz={24}>
      {data[option.value].emoji}
    </Text>
    <div>
      <Text>{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {data[option.value].description}
      </Text>
    </div>
  </Group>
);

function Demo() {
  return (
    <TagsInput
      data={['Apples', 'Bread', 'Bananas', 'Eggs', 'Broccoli']}
      renderOption={renderTagsInputOption}
      label="杂货"
      placeholder="从列表选择标签或输入添加"
      maxDropdownHeight={300}
    />
  );
}

export const renderOption: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
  defaultExpanded: false,
};
