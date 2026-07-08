'use client'

import { Progress } from '@react-ui/ui'

export default function ProgressSectionsDemo() {
    return (
        <Progress
            sections={[
                { value: 25, color: 'cyan', label: '图片' },
                { value: 15, color: 'grape', label: '文档' },
                { value: 20, color: 'pink', label: '视频' }
            ]}
        />
    )
}
