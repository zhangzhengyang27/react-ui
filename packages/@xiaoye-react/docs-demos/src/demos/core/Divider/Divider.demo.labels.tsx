import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Anchor, Box, Divider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Divider, Box, Anchor } from '@xiaoye-react/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <Divider my="xs" label="左侧标签" labelPosition="left" />
      <Divider my="xs" label="居中标签" labelPosition="center" />
      <Divider my="xs" label="右侧标签" labelPosition="right" />
      <Divider
        my="xs"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <MagnifyingGlassIcon size={12} />
            <Box ml={5}>搜索结果</Box>
          </>
        }
      />
      <Divider
        my="xs"
        label={
          <Anchor href="#" target="_blank" inherit>
            Link label
          </Anchor>
        }
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Divider my="xs" label="左侧标签" labelPosition="left" />
      <Divider my="xs" label="居中标签" labelPosition="center" />
      <Divider my="xs" label="右侧标签" labelPosition="right" />
      <Divider
        my="xs"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <MagnifyingGlassIcon size={12} />
            <Box ml={5}>搜索结果</Box>
          </>
        }
      />
      <Divider
        my="xs"
        label={
          <Anchor href="#" target="_blank" inherit>
            Link label
          </Anchor>
        }
      />
    </>
  );
}

export const labels: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
