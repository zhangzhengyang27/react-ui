import React, { useState } from 'react'
import { registry } from './registry'

const App: React.FC = () => {
    const [active, setActive] = useState(registry[0]?.name ?? '')
    const entry = registry.find(c => c.name === active) ?? registry[0]

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
            <aside
                style={{
                    width: 240,
                    borderRight: '1px solid #eee',
                    padding: 16,
                    overflow: 'auto',
                    flexShrink: 0
                }}
            >
                <h2 style={{ margin: '0 0 4px' }}>react-ui</h2>
                <p style={{ margin: '0 0 16px', fontSize: 12, color: '#888' }}>{registry.length} 个组件</p>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {registry.map(c => (
                        <div
                            key={c.name}
                            onClick={() => setActive(c.name)}
                            style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontSize: 14,
                                background: c.name === active ? '#e7f0ff' : 'transparent',
                                color: c.name === active ? '#1769ff' : '#333',
                                fontWeight: c.name === active ? 600 : 400
                            }}
                        >
                            {c.name}
                        </div>
                    ))}
                </nav>
            </aside>

            <main style={{ flex: 1, padding: 32, overflow: 'auto' }}>
                <h1 style={{ marginTop: 0 }}>{entry?.name}</h1>
                {entry?.demos.map((d, i) => (
                    <section key={i} style={{ marginBottom: 32 }}>
                        <h3 style={{ fontSize: 14, color: '#666' }}>{d.title}</h3>
                        <div
                            style={{
                                padding: 24,
                                border: '1px solid #f0f0f0',
                                borderRadius: 8
                            }}
                        >
                            <d.component />
                        </div>
                    </section>
                ))}
            </main>
        </div>
    )
}

export default App
