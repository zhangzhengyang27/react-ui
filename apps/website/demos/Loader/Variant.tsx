'use client'

import { Group, Loader } from '@react-ui/ui'

export default function LoaderVariantDemo() {
    return (
        <Group>
            <Loader type="oval" />
            <Loader type="bars" />
            <Loader type="dots" />
        </Group>
    )
}
