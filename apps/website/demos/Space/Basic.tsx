import React from 'react'
import { Space, Box } from '@react-ui/ui'

const Basic: React.FC = () => {
    return (
        <>
            <Box>上方内容</Box>
            <Space h="md" />
            <Box>下方内容</Box>
        </>
    )
}

export default Basic
