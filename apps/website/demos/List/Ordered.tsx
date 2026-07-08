'use client'

import { List } from '@react-ui/ui'

export default function ListOrderedDemo() {
    return (
        <List type="ordered">
            <List.Item>Clone or download repository from GitHub</List.Item>
            <List.Item>Install dependencies with yarn</List.Item>
            <List.Item>To start development server run npm start</List.Item>
            <List.Item>Run tests to make sure your changes do not break the build</List.Item>
        </List>
    )
}
