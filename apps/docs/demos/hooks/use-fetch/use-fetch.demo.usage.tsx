import { Box, Button, Code, Group, LoadingOverlay, Text } from '@react-ui/ui';
import { useFetch } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Box, Button, Code, Group, LoadingOverlay, Text } from '@react-ui/ui';
import { useFetch } from '@react-ui/hooks';

interface Item {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const mockItems: Item[] = [
  { userId: 1, id: 1, title: '购买杂货', completed: false },
  { userId: 1, id: 2, title: '遛狗', completed: true },
  { userId: 1, id: 3, title: '读书', completed: false },
];

function fetchTodos(): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockItems), 800);
  });
}

function Demo() {
  const { data, loading, error, refetch, abort } = useFetch<Item[]>(fetchTodos);

  return (
    <div>
      {error && <Text c="red">{error.message}</Text>}

      <Group>
        <Button onClick={refetch} color="blue">
          Refetch
        </Button>
        <Button onClick={abort} color="red">
          Abort
        </Button>
      </Group>
      <Box pos="relative" mt="md">
        <Code block>{data ? JSON.stringify(data.slice(0, 3), null, 2) : '加载中'}</Code>
        <LoadingOverlay visible={loading} />
      </Box>
    </div>
  );
}
`;

interface Item {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const mockItems: Item[] = [
  { userId: 1, id: 1, title: '购买杂货', completed: false },
  { userId: 1, id: 2, title: '遛狗', completed: true },
  { userId: 1, id: 3, title: '读书', completed: false },
];

function fetchTodos(): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockItems), 800);
  });
}

function Demo() {
  const { data, loading, error, refetch, abort } = useFetch<Item[]>(fetchTodos);

  return (
    <div>
      {error && <Text c="red">{error.message}</Text>}

      <Group>
        <Button onClick={refetch} color="blue">
          Refetch
        </Button>
        <Button onClick={abort} color="red">
          Abort
        </Button>
      </Group>
      <Box pos="relative" mt="md">
        <Code block>{data ? JSON.stringify(data.slice(0, 3), null, 2) : '加载中'}</Code>
        <LoadingOverlay visible={loading} />
      </Box>
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
