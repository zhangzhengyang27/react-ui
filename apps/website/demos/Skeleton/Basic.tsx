'use client'

import { Skeleton } from '@react-ui/ui'

export default function SkeletonBasicDemo() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} width="70%" radius="xl" />
        </div>
    )
}
