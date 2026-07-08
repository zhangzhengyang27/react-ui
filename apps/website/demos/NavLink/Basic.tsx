'use client'

import { NavLink } from '@react-ui/ui'
import { Home, Settings, User } from 'lucide-react'

export default function NavLinkBasicDemo() {
    return (
        <div style={{ width: 240 }}>
            <NavLink label="首页" leftSection={<Home size={18} />} active />
            <NavLink label="个人资料" leftSection={<User size={18} />} />
            <NavLink label="设置" leftSection={<Settings size={18} />} />
        </div>
    )
}
