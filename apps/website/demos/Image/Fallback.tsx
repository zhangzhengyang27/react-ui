'use client'

import { Image } from '@react-ui/ui'

export default function ImageFallbackDemo() {
    return (
        <Image
            src=""
            fallbackSrc="https://placehold.co/400x250?text=Fallback"
            alt="Fallback 示例"
            width={400}
            height={250}
            radius="md"
        />
    )
}
