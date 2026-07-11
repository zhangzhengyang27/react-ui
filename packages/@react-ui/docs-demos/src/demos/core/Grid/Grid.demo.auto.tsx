import { Grid } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@react-ui/ui';

function Demo() {
  return (
    <Grid>
      <Grid.Col span="auto">1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
      <Grid.Col span="auto">3</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid>
      <Col span="auto">1</Col>
      <Col span={6}>2</Col>
      <Col span="auto">3</Col>
    </Grid>
  );
}

export const auto: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
