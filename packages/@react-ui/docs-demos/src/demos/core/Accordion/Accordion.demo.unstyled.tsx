import { UIDemo } from '@react-ui/demo';
import { BaseDemo } from './_base';

const code = `
import { Accordion } from '@react-ui/ui';

function Demo() {
  return (
    <Accordion order={3} unstyled>
      {/* ... Accordion items */}
    </Accordion>
  );
}
`;

function Demo() {
  return <BaseDemo unstyled />;
}

export const unstyled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
