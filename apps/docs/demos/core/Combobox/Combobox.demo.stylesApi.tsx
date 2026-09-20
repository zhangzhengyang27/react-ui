import { Combobox, TextInput, useCombobox, ComboboxProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ComboboxStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Combobox, TextInput, useCombobox } from '@xiaoye-react/ui';

function Demo() {
  const combobox = useCombobox({ opened: true });

  return (
    <Combobox store={combobox}{{props}}>
      <Combobox.Target>
        <TextInput placeholder="选择值" />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Header>Combobox 头部</Combobox.Header>
        <Combobox.Search placeholder="搜索输入" />

        <Combobox.Options>
          <Combobox.Group label="第一组">
            <Combobox.Option value="1">第一</Combobox.Option>
            <Combobox.Option value="2">第二</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="第二组">
            <Combobox.Option value="3">第三</Combobox.Option>
            <Combobox.Option value="4">第四</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="第三组">
            <Combobox.Empty>该分组中未找到任何内容...</Combobox.Empty>
          </Combobox.Group>
        </Combobox.Options>

        <Combobox.Footer>Combobox 底部</Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
}
`;

function Demo(props: ComboboxProps) {
  const combobox = useCombobox({
    opened: true,
  });

  return (
    <Combobox store={combobox} {...props}>
      <Combobox.Target>
        <TextInput placeholder="选择值" />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Header>Combobox 头部</Combobox.Header>
        <Combobox.Search placeholder="搜索输入" />

        <Combobox.Options>
          <Combobox.Group label="第一组">
            <Combobox.Option value="1">第一</Combobox.Option>
            <Combobox.Option value="2">第二</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="第二组">
            <Combobox.Option value="3">第三</Combobox.Option>
            <Combobox.Option value="4">第四</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="第三组">
            <Combobox.Empty>该分组中未找到任何内容...</Combobox.Empty>
          </Combobox.Group>
        </Combobox.Options>

        <Combobox.Footer>Combobox 底部</Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: ComboboxStylesApi,
  component: Demo,
  code,
};
