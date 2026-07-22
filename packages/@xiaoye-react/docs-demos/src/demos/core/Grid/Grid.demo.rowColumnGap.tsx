import { Grid } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid gap="md" rowGap="xl" columnGap="sm">
      <Grid.Col span={3}>1</Grid.Col>
      <Grid.Col span={3}>2</Grid.Col>
      <Grid.Col span={3}>3</Grid.Col>
      <Grid.Col span={3}>4</Grid.Col>
      <Grid.Col span={3}>5</Grid.Col>
      <Grid.Col span={3}>6</Grid.Col>
      <Grid.Col span={3}>7</Grid.Col>
      <Grid.Col span={3}>8</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid gap="md" rowGap="xl" columnGap="sm">
      <Col span={3}>1</Col>
      <Col span={3}>2</Col>
      <Col span={3}>3</Col>
      <Col span={3}>4</Col>
      <Col span={3}>5</Col>
      <Col span={3}>6</Col>
      <Col span={3}>7</Col>
      <Col span={3}>8</Col>
    </Grid>
  );
}

export const rowColumnGap: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
