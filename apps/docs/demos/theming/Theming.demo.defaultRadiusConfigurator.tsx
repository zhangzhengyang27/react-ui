import { Button, TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = (props: Record<string, any>) => `
import { UIProvider, TextInput, Button } from '@react-ui/ui';

function Demo() {
  return (
    <UIProvider theme={{ defaultRadius: '${props.defaultRadius}' }}>
      <Button fullWidth>带 defaultRadius 的按钮</Button>
      <TextInput mt="sm" label="带 defaultRadius 的文本输入" placeholder="带 defaultRadius 的文本输入" />
    </UIProvider>
  );
}
`;

function Wrapper(props: any) {
  return (
    <>
      <Button radius={props.defaultRadius} fullWidth>
        Button with defaultRadius
      </Button>
      <TextInput
        mt="sm"
        radius={props.defaultRadius}
        label="带 defaultRadius 的文本输入"
        placeholder="带 defaultRadius 的文本输入"
      />
    </>
  );
}

export const defaultRadiusConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [{ type: 'size', prop: 'defaultRadius', initialValue: 'sm', libraryValue: '__none__' }],
};
