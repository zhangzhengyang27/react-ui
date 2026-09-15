import { Button, Group, Text } from '@xiaoye-react/ui';
import { usePagination } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Text } from '@xiaoye-react/ui';
import { usePagination } from '@xiaoye-react/hooks';

function Demo() {
  const pagination = usePagination({ total: 20, siblings: 3, initialPage: 8 });

  return (
    <>
      <Text>Active page: {pagination.active}</Text>
      <Text>Range: [{pagination.range.join(', ')}]</Text>
      <Group mt="md" gap={4}>
        <Button size="compact-sm" variant="default" onClick={pagination.first}>
          First
        </Button>
        <Button size="compact-sm" variant="default" onClick={pagination.previous}>
          Previous
        </Button>
        {pagination.range.map((page, index) =>
          page === 'dots' ? (
            <span key={index}>...</span>
          ) : (
            <Button
              size="compact-sm"
              key={index}
              onClick={() => pagination.setPage(page)}
              variant={pagination.active === page ? 'filled' : 'default'}
              miw={34}
            >
              {page}
            </Button>
          )
        )}
        <Button size="compact-sm" variant="default" onClick={pagination.next}>
          Next
        </Button>
        <Button size="compact-sm" variant="default" onClick={pagination.last}>
          Last
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const pagination = usePagination({ total: 20, siblings: 3, initialPage: 8 });

  return (
    <>
      <Text>Active page: {pagination.active}</Text>
      <Text>Range: [{pagination.range.join(', ')}]</Text>
      <Group mt="md" gap={4}>
        <Button size="compact-sm" variant="default" onClick={pagination.first}>
          First
        </Button>
        <Button size="compact-sm" variant="default" onClick={pagination.previous}>
          Previous
        </Button>
        {pagination.range.map((page, index) =>
          page === 'dots' ? (
            <span key={index}>...</span>
          ) : (
            <Button
              size="compact-sm"
              key={index}
              onClick={() => pagination.setPage(page)}
              variant={pagination.active === page ? 'filled' : 'default'}
              miw={34}
            >
              {page}
            </Button>
          )
        )}
        <Button size="compact-sm" variant="default" onClick={pagination.next}>
          Next
        </Button>
        <Button size="compact-sm" variant="default" onClick={pagination.last}>
          Last
        </Button>
      </Group>
    </>
  );
}

export const siblings: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
