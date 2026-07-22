import { Box, BoxProps, Group, polymorphic } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, BoxProps, polymorphic, Group } from '@xiaoye-react/ui';

interface MyButtonProps extends BoxProps {
  label: string;
}

const MyButton = polymorphic<'button', MyButtonProps>(
  ({ label, ...others }: MyButtonProps) => (
    <Box component="button" {...others}>
      {label}
    </Box>
  )
);

function Demo() {
  return (
    <Group>
      <MyButton label="默认按钮" />
      <MyButton
        label="MyButton 作为锚点"
        component="a"
        href="#"
        target="_blank"
      />
    </Group>
  );
}
`;

interface MyButtonProps extends BoxProps {
  label: string;
}

const MyButton = polymorphic<'button', MyButtonProps>(({ label, ...others }: MyButtonProps) => (
  <Box component="button" {...others}>
    {label}
  </Box>
));

function Demo() {
  return (
    <Group>
      <MyButton label="默认按钮" />
      <MyButton
        label="MyButton 作为锚点"
        component="a"
        href="#"
        target="_blank"
      />
    </Group>
  );
}

export const newPolymorphic: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
