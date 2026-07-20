import { Box, Text, TextProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: TextProps) {
  return (
    <Box maw={400} mx="auto">
      <Text {...props}>
        来自百科：妙蛙种子是一种小型四足宝可梦，拥有蓝绿色皮肤并带有深色斑点。它有着红色眼睛和白色瞳孔，头顶长有耳状突起，嘴巴宽阔、鼻子短钝。张开嘴时可以看到上颚有一对尖牙。它的粗短四肢末端各长有三只锐利爪子。背上的绿色球茎从出生时的种子长成，不仅藏有两条细长藤蔓，还能通过光合作用以及球茎内富含营养的种子为它提供能量。
      </Text>
    </Box>
  );
}

const code = `
import { Text } from '@react-ui/ui';

function Demo() {
  return (
    <Text{{props}}>
      {/* Text content */}
    </Text>
  );
}
`;

export const linesConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { prop: 'size', type: 'size', libraryValue: 'md', initialValue: 'md' },
    {
      prop: 'lineClamp',
      type: 'number',
      initialValue: 4,
      libraryValue: null,
      min: 1,
      max: 10,
      step: 1,
    },
  ],
};
