import { Grid } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={3} order={3}>1</Grid.Col>
      <Grid.Col span={3} order={1}>2</Grid.Col>
      <Grid.Col span={3} order={2}>3</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid>
      <Col span={3} order={3}>
        1
      </Col>
      <Col span={3} order={1}>
        2
      </Col>
      <Col span={3} order={2}>
        3
      </Col>
    </Grid>
  );
}

export const order: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
