import { ImageIcon } from '@phosphor-icons/react';
import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = (props: any) => `
import { Button } from '@react-ui/ui';
import { ImageIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <ImageIcon size={14} />;
  return (
    <>
      <Button justify="${props.justify}" fullWidth leftSection={icon} rightSection={icon} variant="default">
        按钮标签
      </Button>

      <Button justify="${props.justify}" fullWidth leftSection={icon} variant="default" mt="md">
        按钮标签
      </Button>

      <Button justify="${props.justify}" fullWidth rightSection={icon} variant="default" mt="md">
        按钮标签
      </Button>

      <Button
        justify="${props.justify}"
        fullWidth
        rightSection={icon}
        leftSection={<span />}
        variant="default"
        mt="md"
      >
        按钮标签
      </Button>
    </>
  );
}
`;

function Wrapper(props: any) {
  const icon = <ImageIcon size={14} />;
  return (
    <>
      <Button fullWidth leftSection={icon} rightSection={icon} variant="default" {...props}>
        按钮标签
      </Button>

      <Button fullWidth leftSection={icon} variant="default" mt="md" {...props}>
        按钮标签
      </Button>

      <Button fullWidth rightSection={icon} variant="default" mt="md" {...props}>
        按钮标签
      </Button>

      <Button
        fullWidth
        rightSection={icon}
        leftSection={<span />}
        variant="default"
        mt="md"
        {...props}
      >
        按钮标签
      </Button>
    </>
  );
}

export const sectionsJustify: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'segmented',
      prop: 'justify',
      data: ['center', 'space-between'],
      initialValue: 'center',
      libraryValue: '__none__',
    },
  ],
};
