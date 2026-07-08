'use client'

import { NavLink } from '@react-ui/ui'
import { ChevronRight, FileText, Folder } from 'lucide-react'

export default function NavLinkNestedDemo() {
    return (
        <div style={{ width: 260 }}>
            <NavLink label="文档" leftSection={<Folder size={18} />} defaultOpened>
                <NavLink label="入门指南" />
                <NavLink label="API 参考" />
                <NavLink label="示例" rightSection={<ChevronRight size={14} />}>
                    <NavLink label="基础示例" />
                    <NavLink label="高级示例" />
                </NavLink>
            </NavLink>
            <NavLink label="报告" leftSection={<FileText size={18} />} />
        </div>
    )
}
