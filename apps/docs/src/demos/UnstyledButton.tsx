import React from 'react'
import { UnstyledButton } from '@react-ui/ui'

const UnstyledButtonDemo: React.FC = () => {
    return (
        <div>
            <UnstyledButton
                style={{
                    padding: '8px 16px',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    cursor: 'pointer'
                }}
            >
                Unstyled Button
            </UnstyledButton>
        </div>
    )
}

export default UnstyledButtonDemo
