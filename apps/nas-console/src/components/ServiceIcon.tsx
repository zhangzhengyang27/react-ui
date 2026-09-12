import type { ComponentType } from 'react'
import {
    LuBolt,
    LuBookOpen,
    LuBox,
    LuChartColumn,
    LuCloud,
    LuCompass,
    LuDatabase,
    LuFlaskConical,
    LuGlobe,
    LuSearch,
    LuServer,
    LuShieldCheck,
    LuShoppingCart,
    LuTerminal
} from 'react-icons/lu'

const ICON_MAP: Record<string, ComponentType<{ size?: number | string }>> = {
    globe: LuGlobe,
    server: LuServer,
    database: LuDatabase,
    box: LuBox,
    cart: LuShoppingCart,
    cloud: LuCloud,
    terminal: LuTerminal,
    search: LuSearch,
    book: LuBookOpen,
    flask: LuFlaskConical,
    compass: LuCompass,
    zap: LuBolt,
    shield: LuShieldCheck,
    chart: LuChartColumn
}

export function ServiceIcon({ icon, size = 18 }: { icon?: string; size?: number | string }) {
    const Icon = (icon && ICON_MAP[icon]) || LuBox
    return <Icon size={size} />
}
