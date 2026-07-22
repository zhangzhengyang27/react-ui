import { Grid } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={3} order={{ base: 2, sm: 1, lg: 3 }}>2</Grid.Col>
      <Grid.Col span={3} order={{ base: 3, sm: 2, lg: 2 }}>3</Grid.Col>
      <Grid.Col span={3} order={{ base: 1, sm: 3, lg: 1 }}>1</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid>
      <Col span={3} order={{ base: 2, sm: 1, lg: 3 }}>
        2
      </Col>
      <Col span={3} order={{ base: 3, sm: 2, lg: 2 }}>
        3
      </Col>
      <Col span={3} order={{ base: 1, sm: 3, lg: 1 }}>
        1
      </Col>
    </Grid>
  );
}

export const order: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
