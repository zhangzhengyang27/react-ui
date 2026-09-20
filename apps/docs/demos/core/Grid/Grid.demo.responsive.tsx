import { Grid } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>2</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid>
      <Col span={{ base: 12, md: 6, lg: 3 }}>1</Col>
      <Col span={{ base: 12, md: 6, lg: 3 }}>2</Col>
      <Col span={{ base: 12, md: 6, lg: 3 }}>3</Col>
      <Col span={{ base: 12, md: 6, lg: 3 }}>4</Col>
    </Grid>
  );
}

export const responsive: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
