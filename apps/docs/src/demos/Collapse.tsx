import React, { useState } from 'react'
import { Collapse } from '@react-ui/ui'

const CollapseDemo: React.FC = () => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div>
            <button onClick={() => setExpanded(v => !v)}>toggle collapse</button>
            <Collapse expanded={expanded} transitionDuration={300}>
                <div style={{ padding: 16, background: '#f0f0f0', marginTop: 8, borderRadius: 8 }}>
                    折叠内容：展开 / 收起带高度过渡动画。
                </div>
            </Collapse>
        </div>
    )
}

export default CollapseDemo
