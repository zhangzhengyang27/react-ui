'use client'

import { List, ThemeIcon } from '@react-ui/ui'

export default function ListWithIconDemo() {
    return (
        <List
            spacing="xs"
            size="sm"
            center
            icon={
                <ThemeIcon color="teal" size={16} radius="xl">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
                        <path d="M5 13l4 4L19 7" stroke="none" />
                    </svg>
                </ThemeIcon>
            }
        >
            <List.Item>Clone or download repository from GitHub</List.Item>
            <List.Item>Install dependencies with yarn</List.Item>
            <List.Item>To start development server run npm start</List.Item>
            <List.Item>Run tests to make sure your changes do not break the build</List.Item>
        </List>
    )
}
