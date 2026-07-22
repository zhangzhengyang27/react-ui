import { Grid } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid columns={24}>
      <Grid.Col span={12}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
      <Grid.Col span={6}>3</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid columns={24}>
      <Col span={12}>1</Col>
      <Col span={6}>2</Col>
      <Col span={6}>3</Col>
    </Grid>
  );
}

export const columns: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
