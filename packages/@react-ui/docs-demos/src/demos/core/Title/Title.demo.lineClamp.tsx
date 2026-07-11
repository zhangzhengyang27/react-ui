import { Box, Title } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Title, Box } from '@react-ui/ui';

function Demo() {
  return (
    <Box maw={400}>
      <Title order={2}{{props}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo
        amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur
        non repudiandae enim adipisci?
      </Title>
    </Box>
  )
}
`;

function Wrapper(props: any) {
  return (
    <Box maw={400}>
      <Title order={2} {...props}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo
        amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur
        non repudiandae enim adipisci?
      </Title>
    </Box>
  );
}

export const lineClamp: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'number', prop: 'lineClamp', initialValue: 2, libraryValue: null, min: 1, max: 8 },
  ],
};
