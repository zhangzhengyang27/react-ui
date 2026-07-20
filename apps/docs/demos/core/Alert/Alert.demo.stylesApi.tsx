import { HeartIcon } from '@phosphor-icons/react';
import { Alert } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { AlertStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Alert } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

function Demo() {
  const icon = <HeartIcon />;

  return (
    <Alert title="提示标题" icon={icon} withCloseButton{{props}}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt corporis natus veniam quis
      cupiditate enim architecto mollitia numquam temporibus, consectetur nam laboriosam voluptates
      nemo facilis? Exercitationem aut praesentium quibusdam reiciendis.
    </Alert>
  );
}
`;

function Demo(props: any) {
  return (
    <Alert title="提示标题" icon={<HeartIcon />} withCloseButton {...props}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt corporis natus veniam quis
      cupiditate enim architecto mollitia numquam temporibus, consectetur nam laboriosam voluptates
      nemo facilis? Exercitationem aut praesentium quibusdam reiciendis.
    </Alert>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: AlertStylesApi,
  component: Demo,
  centered: true,
  maxWidth: 440,
  code,
};
