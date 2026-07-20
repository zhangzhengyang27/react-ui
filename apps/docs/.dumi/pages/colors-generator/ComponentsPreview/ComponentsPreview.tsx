import { Button, Input, UIColorsTuple, UIProvider, Table } from '@react-ui/ui';
import { useDebouncedValue } from '@react-ui/hooks';

interface ComponentsPreviewProps {
  colors: UIColorsTuple;
}

export function ComponentsPreview({ colors }: ComponentsPreviewProps) {
  const [debouncedColors] = useDebouncedValue(colors, 100);

  return (
    <>
      <Input.Label display="block" size="md" labelElement="div" mt="xl" mb="sm">
        变体预览
      </Input.Label>

      <UIProvider theme={{ colors: { '__colors-generator__': debouncedColors } }}>
        <Table.ScrollContainer minWidth={600}>
          <Table withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th ta="center">填充</Table.Th>
                <Table.Th ta="center">浅色</Table.Th>
                <Table.Th ta="center">轮廓</Table.Th>
                <Table.Th ta="center">微妙</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <Button color="__colors-generator__" fullWidth autoContrast>
                    按钮
                  </Button>
                </Table.Td>
                <Table.Td>
                  <Button color="__colors-generator__" variant="light" fullWidth>
                    按钮
                  </Button>
                </Table.Td>
                <Table.Td>
                  <Button color="__colors-generator__" variant="outline" fullWidth>
                    按钮
                  </Button>
                </Table.Td>
                <Table.Td>
                  <Button color="__colors-generator__" variant="subtle" fullWidth>
                    按钮
                  </Button>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </UIProvider>
    </>
  );
}
