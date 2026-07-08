'use client'

import { TableOfContents } from '@react-ui/ui'

export default function BasicDemo() {
    return (
        <TableOfContents
            variant="light"
            radius="md"
            initialData={[
                { depth: 1, value: '概述', id: 'overview' },
                { depth: 2, value: '安装', id: 'install' },
                { depth: 2, value: '基础用法', id: 'usage' },
                { depth: 1, value: 'API', id: 'api' }
            ]}
        />
    )
}
