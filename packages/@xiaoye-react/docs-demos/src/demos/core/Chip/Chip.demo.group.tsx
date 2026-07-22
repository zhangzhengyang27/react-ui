import { Chip, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Chip, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Chip.Group>
        <Group justify="center">
          <Chip value="1">单选芯片</Chip>
          <Chip value="2">可被选择</Chip>
          <Chip value="3">一次</Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple>
        <Group justify="center" mt="md">
          <Chip value="1">多选芯片</Chip>
          <Chip value="2">可被选择</Chip>
          <Chip value="3">一次</Chip>
        </Group>
      </Chip.Group>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Chip.Group>
        <Group justify="center">
          <Chip value="1">单选芯片</Chip>
          <Chip value="2">可被选择</Chip>
          <Chip value="3">一次</Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple>
        <Group justify="center" mt="md">
          <Chip value="1">多选芯片</Chip>
          <Chip value="2">可被选择</Chip>
          <Chip value="3">一次</Chip>
        </Group>
      </Chip.Group>
    </>
  );
}

export const group: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
