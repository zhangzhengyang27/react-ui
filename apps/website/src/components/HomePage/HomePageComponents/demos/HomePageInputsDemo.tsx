import {
  ColorInput,
  FileInput,
  Input,
  MultiSelect,
  NumberInput,
  PinInput,
  Select,
  SimpleGrid,
  TextInput,
  TreeSelect,
} from '@react-ui/ui';
import { DatePickerInput } from '@react-ui/dates';

const inputProps = {
  size: 'lg' as const,
  radius: 'md',
};

const treeSelectData = [
  {
    value: 'frontend',
    label: '前端',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    value: 'backend',
    label: '后端',
    children: [
      { value: 'nodejs', label: 'Node.js' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
    ],
  },
];

export function HomePageInputsDemo() {
  return (
    <div>
      <SimpleGrid cols={{ md: 3 }} spacing="xl" verticalSpacing={25}>
        <TextInput label="文本输入" placeholder="请输入文本" {...inputProps} />
        <NumberInput
          label="数字输入"
          placeholder="请输入数字"
          {...inputProps}
          prefix="$ "
          thousandSeparator
          defaultValue={30712}
        />
        <DatePickerInput
          label="日期范围选择器"
          placeholder="选择日期范围"
          popoverProps={{ radius: 'md' }}
          type="range"
          {...inputProps}
        />
        <ColorInput
          label="颜色输入"
          defaultValue="#129ce0"
          placeholder="选择颜色"
          format="rgba"
          popoverProps={{ radius: 'md' }}
          {...inputProps}
        />
        <TreeSelect
          label="树形选择"
          placeholder="从树中选择"
          {...inputProps}
          data={treeSelectData}
          defaultValue="react"
          comboboxProps={{ radius: 'md' }}
        />

        <FileInput label="文件输入" placeholder="上传文件" {...inputProps} />

        <Select
          label="下拉选择"
          placeholder="选择一项"
          {...inputProps}
          checkIconPosition="right"
          defaultValue="🇫🇷 法国"
          data={['🇩🇪 德国', '🇫🇷 法国', '🇬🇧 英国', '🇺🇸 美国']}
        />

        <MultiSelect
          label="多选"
          placeholder="搜索并选择"
          {...inputProps}
          comboboxProps={{ radius: 'md' }}
          defaultValue={['React', 'Vue']}
          searchable
          checkIconPosition="right"
          data={['React', 'Angular', 'Vue', 'Svelte', 'Ember', 'Preact', 'Solid', 'Alpine']}
        />

        <div>
          <Input.Label size="lg">PIN 码输入</Input.Label>
          <PinInput {...inputProps} />
        </div>
      </SimpleGrid>
    </div>
  );
}
