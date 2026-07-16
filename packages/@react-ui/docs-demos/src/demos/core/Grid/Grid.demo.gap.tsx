import { Grid } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@react-ui/ui';

function Demo() {
  return (
    <Grid gap={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid gap={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
      <Col span={4}>1</Col>
      <Col span={4}>2</Col>
      <Col span={4}>3</Col>
    </Grid>
  );
}

export const gap: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
