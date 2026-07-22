import { Container } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Container } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Container fluid h={50} bg="var(--ui-color-blue-light)">
      Fluid container has 100% max-width
    </Container>
  );
}
`;

function Demo() {
  return (
    <Container fluid h={50} bg="var(--ui-color-blue-light)">
      Fluid container has 100% max-width
    </Container>
  );
}

export const fluid: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
