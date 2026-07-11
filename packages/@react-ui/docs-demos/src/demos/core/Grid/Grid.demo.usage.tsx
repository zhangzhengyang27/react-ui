import { Grid } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@react-ui/ui';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid>
      <Col span={4}>1</Col>
      <Col span={4}>2</Col>
      <Col span={4}>3</Col>
    </Grid>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
