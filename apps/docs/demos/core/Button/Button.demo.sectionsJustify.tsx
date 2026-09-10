import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image'
import { Button } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = (props: any) => `
import { Button } from '@xiaoye-react/ui';
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image';
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
`

function Wrapper(props: any) {
    const icon = <ImageIcon size={14} />
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

            <Button fullWidth rightSection={icon} leftSection={<span />} variant="default" mt="md" {...props}>
                按钮标签
            </Button>
        </>
    )
}

export const sectionsJustify: UIDemo = {
    type: 'configurator',
    component: Wrapper,
    code,
    title: '区域对齐',
    description: '调整图标区域与标签之间的对齐方式。',
    controls: [
        {
            type: 'segmented',
            prop: 'justify',
            data: ['center', 'space-between'],
            initialValue: 'center',
            libraryValue: '__none__'
        }
    ]
}
