import { Avatar, MultiSelect, Pill } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { MultiSelect, Pill, Avatar } from '@react-ui/ui';

const users = [
  { value: 'Emily Johnson', label: 'Emily Johnson', image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-7.png' },
  { value: 'Ava Rodriguez', label: 'Ava Rodriguez', image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-8.png' },
  { value: 'Olivia Chen', label: 'Olivia Chen', image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-4.png' },
  { value: 'Ethan Barnes', label: 'Ethan Barnes', image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-1.png' },
  { value: 'Mason Taylor', label: 'Mason Taylor', image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-2.png' },
];

const usersMap = new Map(users.map((user) => [user.value.toString(), user]));

function Demo() {
  return (
    <MultiSelect
      data={users}
      label="候选人"
      placeholder="选择候选人"
      defaultValue={['Emily Johnson', 'Ava Rodriguez']}
      renderPill={({ option, onRemove }) => {
        const user = usersMap.get(option?.value.toString());
        return (
          <Pill withRemoveButton onRemove={onRemove}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar src={user?.image} size={16} />
              {option?.label}
            </div>
          </Pill>
        );
      }}
    />
  );
}
`;

const users = [
  {
    value: 'Emily Johnson',
    label: 'Emily Johnson',
    image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-7.png',
  },
  {
    value: 'Ava Rodriguez',
    label: 'Ava Rodriguez',
    image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-8.png',
  },
  {
    value: 'Olivia Chen',
    label: 'Olivia Chen',
    image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-4.png',
  },
  {
    value: 'Ethan Barnes',
    label: 'Ethan Barnes',
    image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-1.png',
  },
  {
    value: 'Mason Taylor',
    label: 'Mason Taylor',
    image: 'https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-2.png',
  },
];

const usersMap = new Map(users.map((user) => [user.value.toString(), user]));

function Demo() {
  return (
    <MultiSelect
      data={users}
      label="候选人"
      placeholder="选择候选人"
      defaultValue={['Emily Johnson', 'Ava Rodriguez']}
      renderPill={({ option, onRemove }) => {
        const user = usersMap.get(option?.value.toString());
        return (
          <Pill withRemoveButton onRemove={onRemove} style={{ paddingInlineStart: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar src={user?.image} size={16} />
              {option?.label}
            </div>
          </Pill>
        );
      }}
    />
  );
}

export const renderPill: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
