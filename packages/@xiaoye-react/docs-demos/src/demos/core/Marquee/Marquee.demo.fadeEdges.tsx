import { Marquee, Stack, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { UILogo } from '@xiaoye-react/logo';

const code = `
import { Marquee, Stack, Text } from '@xiaoye-react/ui';
import { UILogo } from '@xiaoye-react/logo';

function Demo() {
  return (
    <Stack>
      <div>
        <Text size="sm" mb="xs">Default fade (5%)</Text>
        <Marquee>
          <UILogo size={80} type="full" color="blue" />
          <UILogo size={80} type="full" color="cyan" />
          <UILogo size={80} type="full" color="teal" />
          <UILogo size={80} type="full" color="green" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">Larger fade (15%)</Text>
        <Marquee fadeEdgeSize="15%">
          <UILogo size={80} type="full" color="lime" />
          <UILogo size={80} type="full" color="yellow" />
          <UILogo size={80} type="full" color="orange" />
          <UILogo size={80} type="full" color="red" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">自定义渐隐颜色</Text>
        <Marquee fadeEdgeColor="var(--ui-color-blue-light)">
          <UILogo size={80} type="full" color="violet" />
          <UILogo size={80} type="full" color="grape" />
          <UILogo size={80} type="full" color="pink" />
          <UILogo size={80} type="full" color="red" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">无渐隐</Text>
        <Marquee fadeEdges={false}>
          <UILogo size={80} type="full" color="blue" />
          <UILogo size={80} type="full" color="teal" />
          <UILogo size={80} type="full" color="green" />
          <UILogo size={80} type="full" color="yellow" />
        </Marquee>
      </div>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <div>
        <Text size="sm" mb="xs">
          Default fade (5%)
        </Text>
        <Marquee>
          <UILogo size={80} type="full" color="blue" />
          <UILogo size={80} type="full" color="cyan" />
          <UILogo size={80} type="full" color="teal" />
          <UILogo size={80} type="full" color="green" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">
          Larger fade (15%)
        </Text>
        <Marquee fadeEdgeSize="15%">
          <UILogo size={80} type="full" color="lime" />
          <UILogo size={80} type="full" color="yellow" />
          <UILogo size={80} type="full" color="orange" />
          <UILogo size={80} type="full" color="red" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">
          Custom fade color
        </Text>
        <Marquee fadeEdgeColor="var(--ui-color-blue-light)">
          <UILogo size={80} type="full" color="violet" />
          <UILogo size={80} type="full" color="grape" />
          <UILogo size={80} type="full" color="pink" />
          <UILogo size={80} type="full" color="red" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">
          No fade
        </Text>
        <Marquee fadeEdges={false}>
          <UILogo size={80} type="full" color="blue" />
          <UILogo size={80} type="full" color="teal" />
          <UILogo size={80} type="full" color="green" />
          <UILogo size={80} type="full" color="yellow" />
        </Marquee>
      </div>
    </Stack>
  );
}

export const fadeEdges: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
