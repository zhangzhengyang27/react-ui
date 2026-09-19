import { useState } from 'react';
import { Button, Group, Skeleton, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Skeleton, Text, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </>
      ) : (
        <Text>内容加载完成后展示的真实文本……</Text>
      )}

      <Group justify="center" mt="xs">
        <Button onClick={() => setLoading((l) => !l)}>切换骨架屏</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </>
      ) : (
        <>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolor nihil amet tempore
            magnam optio, numquam nostrum inventore tempora assumenda saepe, aut repellat. Temporibus
            aspernatur aperiam magnam debitis facere odio?
          </Text>
          <Text mt="sm">
            Laborum fuga quam voluptas aut pariatur delectus repudiandae commodi tempora debitis
            dolores vero cumque magni cum, deserunt, ad tempore consectetur libero molestias similique
            nemo eum! Dolore maxime voluptate inventore atque.
          </Text>
        </>
      )}

      <Group justify="center" mt="xs">
        <Button onClick={() => setLoading((l) => !l)}>切换骨架屏</Button>
      </Group>
    </>
  );
}

export const content: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
