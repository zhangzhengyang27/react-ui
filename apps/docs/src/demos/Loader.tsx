import React from 'react'
import { Loader } from '@react-ui/ui'

const LoaderDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <Loader />
            <Loader type="bars" />
            <Loader type="dots" />
            <Loader size="sm" />
            <Loader size="lg" />
            <Loader color="red" />
        </div>
    )
}

export default LoaderDemo
