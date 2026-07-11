import { Text } from '@react-ui/ui';
import { TimeValue } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Text } from '@react-ui/ui';
import { TimeValue } from '@react-ui/dates';

function Demo() {
  return (
    <div>
      <Text>
        24h format: <TimeValue value={new Date(2021, 1, 1, 18, 45, 34)} />
      </Text>
      <Text>
        12h format: <TimeValue format="12h" value={new Date(2021, 1, 1, 18, 45, 34)} />
      </Text>
    </div>
  );
}
`;

function Demo() {
  return (
    <div>
      <Text>
        24h format: <TimeValue value={new Date(2021, 1, 1, 18, 45, 34)} />
      </Text>
      <Text>
        12h format: <TimeValue format="12h" value={new Date(2021, 1, 1, 18, 45, 34)} />
      </Text>
    </div>
  );
}

export const dateObject: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
