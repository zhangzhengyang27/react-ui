import React from 'react'
import { FiArrowRight } from '../../../../.dumi/theme/icons'
import { Button, ButtonProps, Group } from '@xiaoye-react/ui'
import classes from './dataAttributes.module.css'

function SendFilesButton(props: ButtonProps & React.ComponentProps<'button'>) {
    return <Button {...props} classNames={classes} />
}

export default function Demo() {
    return (
        <Group>
            <SendFilesButton leftSection="12" rightSection={<FiArrowRight size={18} />}>
                发送文件
            </SendFilesButton>
            <SendFilesButton leftSection="3" rightSection={<FiArrowRight size={18} />} disabled>
                发送文件
            </SendFilesButton>
        </Group>
    )
}
