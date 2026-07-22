import { Box, Text } from '@xiaoye-react/ui';
import { useInViewport } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, Text } from '@xiaoye-react/ui';
import { useInViewport } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, inViewport } = useInViewport();
  return (
    <>
      <Text ta="center">{inViewport ? '盒子可见' : '滚动查看盒子'}</Text>
      <Box h={64} style={{ overflow: 'scroll' }}>
        <Box h={128}></Box>
        <Box ref={ref} bg="blue" h={32} p={8}>
          <Text ta="center" c="white">
            A box
          </Text>
        </Box>
      </Box>
    </>
  );
}
`;

function Demo() {
  const { ref, inViewport } = useInViewport();
  return (
    <>
      <Text ta="center">{inViewport ? '盒子可见' : '滚动查看盒子'}</Text>
      <Box h={64} style={{ overflow: 'scroll' }}>
        <Box h={128} />
        <Box ref={ref} bg="blue" h={32} p={8}>
          <Text ta="center" c="white">
            A box
          </Text>
        </Box>
      </Box>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
