import { TimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TimePicker label="输入时间" format="12h" amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }} />
  );
}
`;

function Demo() {
  return <TimePicker label="输入时间" format="12h" amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }} />;
}

export const amPmLabels: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
