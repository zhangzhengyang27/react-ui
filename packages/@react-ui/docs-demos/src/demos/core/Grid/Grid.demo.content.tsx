import { Grid } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@react-ui/ui';

function Demo() {
  return (
    <Grid>
      <Grid.Col span="content">适应内容</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid>
      <Col span="content">适应内容</Col>
      <Col span={6}>2</Col>
    </Grid>
  );
}

export const content: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
