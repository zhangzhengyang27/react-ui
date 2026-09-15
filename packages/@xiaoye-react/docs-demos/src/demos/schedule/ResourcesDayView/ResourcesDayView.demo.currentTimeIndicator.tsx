import { ResourcesDayView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import { ResourcesDayView } from '@xiaoye-react/ui';
import { events, resources } from './data';

function Demo() {
  return (
    <ResourcesDayView
      date={new Date('2024-01-15')}
      resources={resources}
      events={events}
      withCurrentTimeIndicator
      withCurrentTimeBubble={false}
    />
  );
}
`;

function Demo() {
  return (
    <ResourcesDayView
      date={new Date('2024-01-15')}
      resources={resources}
      events={resourceEvents}
      withCurrentTimeIndicator
      withCurrentTimeBubble={false}
    />
  );
}

export const currentTimeIndicator: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
