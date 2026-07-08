'use client'

import { Group, ThemeIcon } from '@react-ui/ui'

const Icon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
)

export default function ThemeIconVariantsDemo() {
    return (
        <Group>
            <ThemeIcon variant="filled">
                <Icon />
            </ThemeIcon>
            <ThemeIcon variant="light">
                <Icon />
            </ThemeIcon>
            <ThemeIcon variant="outline">
                <Icon />
            </ThemeIcon>
        </Group>
    )
}
