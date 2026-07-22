import { useState } from 'react';
import { Button, Group, Skeleton, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Skeleton, Button } from '@xiaoye-react/ui';

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Skeleton visible={loading}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>

      <Button onClick={() => setLoading((l) => !l)}>
        Toggle Skeleton
      </Button>
    </>
  );
}
`;

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Skeleton visible={loading}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolor nihil amet tempore
          magnam optio, numquam nostrum inventore tempora assumenda saepe, aut repellat. Temporibus
          aspernatur aperiam magnam debitis facere odio?
        </Text>
        <Text>
          Laborum fuga quam voluptas aut pariatur delectus repudiandae commodi tempora debitis
          dolores vero cumque magni cum, deserunt, ad tempore consectetur libero molestias similique
          nemo eum! Dolore maxime voluptate inventore atque.
        </Text>
      </Skeleton>

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
