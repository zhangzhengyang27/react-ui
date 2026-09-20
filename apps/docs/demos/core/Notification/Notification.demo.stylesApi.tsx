import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { Box, Notification, NotificationProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { NotificationStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { Notification } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Notification{{props}} title="我们通知你">
      You are now obligated to give a star to ReactUI project on GitHub
    </Notification>
  );
}
`

function Demo(props: NotificationProps) {
    return (
        <Box maw={400} mx="auto">
            <Notification title="请稍候" loading withCloseButton={false} {...props}>
                The application is trying to reconnect to the server
            </Notification>
            <Notification mt="md" icon={<CheckIcon size={18} />} title="我们通知你" {...props}>
                You are now obligated to give a star to ReactUI project on GitHub
            </Notification>
        </Box>
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: NotificationStylesApi,
    centered: true,
    dimmed: true,
    component: Demo,
    code
}
