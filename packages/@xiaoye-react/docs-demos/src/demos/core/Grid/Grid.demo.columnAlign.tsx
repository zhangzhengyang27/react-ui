import { Grid } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid align="stretch">
      <Grid.Col span={4} align="flex-start">
        <div style={{ height: '100px', background: 'var(--ui-color-blue-light)' }}>
          flex-start
        </div>
      </Grid.Col>
      <Grid.Col span={4} align="center">
        <div style={{ height: '100px', background: 'var(--ui-color-blue-light)' }}>
          center
        </div>
      </Grid.Col>
      <Grid.Col span={4} align="flex-end">
        <div style={{ height: '100px', background: 'var(--ui-color-blue-light)' }}>
          flex-end
        </div>
      </Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid align="stretch">
      <Col span={4} align="flex-start" style={{ minHeight: '150px' }}>
        flex-start
      </Col>
      <Col span={4} align="center" style={{ minHeight: '150px' }}>
        center
      </Col>
      <Col span={4} align="flex-end" style={{ minHeight: '150px' }}>
        flex-end
      </Col>
    </Grid>
  );
}

export const columnAlign: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
