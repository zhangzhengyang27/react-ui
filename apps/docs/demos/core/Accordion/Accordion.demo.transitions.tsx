import { UIDemo } from '@react-ui/demo';
import { BaseDemo } from './_base';

const getCode = (prop: string) => `
import { Accordion } from '@react-ui/ui';

function Demo() {
  return (
    <Accordion order={3} ${prop}>
      {/* ...content */}
    </Accordion>
  )
}
`;

export const disableTransitions: UIDemo = {
  type: 'code',
  component: () => <BaseDemo transitionDuration={0} />,
  code: getCode('transitionDuration={0}'),
  maxWidth: 380,
  centered: true,
};

export const customTransitions: UIDemo = {
  type: 'code',
  component: () => <BaseDemo transitionDuration={1000} />,
  code: getCode('transitionDuration={1000}'),
  maxWidth: 380,
  centered: true,
};
