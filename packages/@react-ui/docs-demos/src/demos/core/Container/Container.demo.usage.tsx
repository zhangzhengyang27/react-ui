import { Container } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Container } from '@react-ui/ui';

function Demo() {
  const demoProps = {
    bg: 'var(--ui-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <>
      <Container {...demoProps}>默认 Container</Container>

      <Container size="xs" {...demoProps}>
        xs Container
      </Container>

      <Container px={0} size={480} {...demoProps}>
        480px Container without padding
      </Container>
    </>
  );
}
`;

function Demo() {
  const demoProps = {
    bg: 'var(--ui-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <>
      <Container {...demoProps} mt={0}>
        Default Container
      </Container>
      <Container size="xs" {...demoProps}>
        xs Container
      </Container>
      <Container px={0} size={480} {...demoProps}>
        480px Container without padding
      </Container>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
