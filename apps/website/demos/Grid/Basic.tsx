'use client'

import { Grid } from '@react-ui/ui'

export default function GridBasicDemo() {
    return (
        <Grid>
            <Grid.Col span={4}>
                <div style={{ padding: 16, background: 'var(--ui-color-blue-filled)', borderRadius: 8 }}>1</div>
            </Grid.Col>
            <Grid.Col span={4}>
                <div style={{ padding: 16, background: 'var(--ui-color-blue-filled)', borderRadius: 8 }}>2</div>
            </Grid.Col>
            <Grid.Col span={4}>
                <div style={{ padding: 16, background: 'var(--ui-color-blue-filled)', borderRadius: 8 }}>3</div>
            </Grid.Col>
        </Grid>
    )
}
