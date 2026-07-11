import { Badge } from '@react-ui/ui';
import { useColorScheme } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Badge } from '@react-ui/ui';
import { useColorScheme } from '@react-ui/hooks';

function Demo() {
  const colorScheme = useColorScheme();

  return (
    <Badge color={colorScheme === 'dark' ? 'blue' : 'teal'} variant="filled">
      Your system color scheme is {colorScheme}
    </Badge>
  );
}`;

function Demo() {
  const colorScheme = useColorScheme();

  return (
    <Badge color={colorScheme === 'dark' ? 'blue' : 'teal'} variant="filled">
      Your system color scheme is {colorScheme}
    </Badge>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
