import { UIDemo } from '@xiaoye-react/demo';
import { BaseDemo } from './_base';

const code = `
import { Accordion } from '@xiaoye-react/ui';

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
