import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, Group, Switch } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ActionIcon, Group, Switch } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <ActionIcon loading={loading} aria-label="点赞">
          <HeartIcon size={18} />
        </ActionIcon>
        <ActionIcon variant="light" loading={loading} aria-label="点赞">
          <HeartIcon size={18} />
        </ActionIcon>
        <ActionIcon variant="outline" loading={loading} aria-label="点赞">
          <HeartIcon size={18} />
        </ActionIcon>
      </Group>

      <Switch checked={loading} onChange={toggle} label="加载状态" mt="md" />
    </>
  );
}
`;

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <ActionIcon loading={loading} aria-label="点赞">
          <HeartIcon size={18} />
        </ActionIcon>
        <ActionIcon variant="light" loading={loading} aria-label="点赞">
          <HeartIcon size={18} />
        </ActionIcon>
        <ActionIcon variant="outline" loading={loading} aria-label="点赞">
          <HeartIcon size={18} />
        </ActionIcon>
      </Group>

      <Switch checked={loading} onChange={toggle} label="加载状态" mt="md" />
    </>
  );
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
