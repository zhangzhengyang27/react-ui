import { Text } from '@react-ui/ui';
import { TimeValue } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Text } from '@react-ui/ui';
import { TimeValue } from '@react-ui/dates';

function Demo() {
  return (
    <div>
      <Text>
        12h format: <TimeValue value="18:45:34" format="12h" withSeconds />
      </Text>
      <Text>
        24h format: <TimeValue value="18:45:34" withSeconds />
      </Text>
    </div>
  );
}
`;

function Demo() {
  return (
    <div>
      <Text>
        12h format: <TimeValue value="18:45:34" format="12h" withSeconds />
      </Text>
      <Text>
        24h format: <TimeValue value="18:45:34" withSeconds />
      </Text>
    </div>
  );
}

export const withSeconds: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
