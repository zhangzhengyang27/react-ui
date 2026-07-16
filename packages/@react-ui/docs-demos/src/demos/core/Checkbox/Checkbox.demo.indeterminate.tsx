import { Box, Checkbox } from '@react-ui/ui';
import { randomId, useListState } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useListState, randomId } from '@react-ui/hooks';
import { Checkbox } from '@react-ui/ui';

const initialValues = [
  { label: '接收邮件通知', checked: false, key: 'notification-1' },
  { label: '接收短信通知', checked: false, key: 'notification-2' },
  { label: '接收推送通知', checked: false, key: 'notification-3' },
];

export function IndeterminateCheckbox() {
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="接收所有通知"
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </>
  );
}
`;

const initialValues = [
  { label: '接收邮件通知', checked: false, key: 'notification-1' },
  { label: '接收短信通知', checked: false, key: 'notification-2' },
  { label: '接收推送通知', checked: false, key: 'notification-3' },
];

export function Demo() {
  const [values, handlers] = useListState(initialValues);
  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));

  return (
    <Box maw={400} mx="auto">
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="接收所有通知"
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </Box>
  );
}

export const indeterminate: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
