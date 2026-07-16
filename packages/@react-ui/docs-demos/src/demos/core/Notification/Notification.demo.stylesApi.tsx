import { CheckIcon } from '@phosphor-icons/react';
import { Box, Notification } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { NotificationStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Notification } from '@react-ui/ui';

function Demo() {
  return (
    <Notification{{props}} title="我们通知你">
      You are now obligated to give a star to ReactUI project on GitHub
    </Notification>
  );
}
`;

function Demo(props: any) {
  return (
    <Box maw={400} mx="auto">
      <Notification title="请稍候" loading withCloseButton={false} {...props}>
        The application is trying to reconnect to the server
      </Notification>
      <Notification mt="md" icon={<CheckIcon size={18} />} title="我们通知你" {...props}>
        You are now obligated to give a star to ReactUI project on GitHub
      </Notification>
    </Box>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: NotificationStylesApi,
  centered: true,
  dimmed: true,
  component: Demo,
  code,
};
