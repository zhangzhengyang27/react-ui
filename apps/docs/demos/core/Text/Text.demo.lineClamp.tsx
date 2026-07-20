import { Text, Typography } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Typography, Text } from '@react-ui/ui';

function Demo() {
  return (
    <Text lineClamp={3} component="div">
      <Typography>
        <h3>使用 Typography 的文本截断</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed
          corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis
          non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum
          veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae
          perspiciatis.
        </p>
      </Typography>
    </Text>
  );
}
`;

function Demo() {
  return (
    <Text lineClamp={3} component="div">
      <Typography>
        <h3 style={{ marginTop: 0 }}>使用 Typography 的文本截断</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed
          corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis
          non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum
          veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae
          perspiciatis.
        </p>
      </Typography>
    </Text>
  );
}

export const lineClamp: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
