import React from 'react';
import { Grid, Paper } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Grid>
      <Grid.Col span={4}><Paper p="md" withBorder>col-4</Paper></Grid.Col>
      <Grid.Col span={4}><Paper p="md" withBorder>col-4</Paper></Grid.Col>
      <Grid.Col span={4}><Paper p="md" withBorder>col-4</Paper></Grid.Col>
    </Grid>
  </DemoWrap>
);

export default App;
