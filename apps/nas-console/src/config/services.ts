/**
 * 服务清单（v1 为 git 管理的静态配置，随构建进 dist）
 *
 * 约定：
 * - `checkable` 要求公网 HTTPS 入口——浏览器端 no-cors 探测无法处理
 *   自签证书、纯 HTTP（混合内容拦截）与 TCP-only 服务，这类服务只展示链接。
 * - TODO: XSearch / Tools / music / downloader 的公网 URL 记录在 NAS 文档卷
 *   （当前未挂载），挂载后补齐再放开 checkable。
 */

export type ServiceGroup = '应用站点' | '文档与统计' | '面板与运维' | '数据库与中间件'

export interface ServiceDef {
    id: string
    name: string
    description?: string
    group: ServiceGroup
    /** 公网入口链接（空字符串表示纯内网/TCP 服务，无入口可点） */
    url: string
    /** NAS 容器端口（信息展示） */
    internalPort?: number
    /** 是否参与浏览器端健康检查 */
    checkable: boolean
    /** 图标 key，映射见 ServiceIcon */
    icon?: string
}

export const SERVICES: ServiceDef[] = [
    // —— 应用站点 ——
    {
        id: 'admin-vue',
        name: 'admin-vue 后台管理系统',
        description: 'NestJS 微服务 + pure-admin 前台',
        group: '应用站点',
        url: 'https://admin-vue.zhangzhengyang.com',
        internalPort: 5800,
        checkable: true,
        icon: 'shield'
    },
    {
        id: 'webcommand',
        name: 'webCommand',
        description: 'Nuxt 4 命令/工具站',
        group: '应用站点',
        url: 'https://command.zhangzhengyang.com',
        internalPort: 4900,
        checkable: true,
        icon: 'terminal'
    },
    {
        id: 'x-pan',
        name: 'X-Pan 云盘',
        description: '个人云存储（分片上传/分享/AI 摘要）',
        group: '应用站点',
        url: 'https://pan.zhangzhengyang.com',
        internalPort: 8081,
        checkable: true,
        icon: 'cloud'
    },
    {
        id: 'xy-mall',
        name: 'xy-mall 商城',
        description: 'Spring Boot 商城前台',
        group: '应用站点',
        url: 'https://mall.zhangzhengyang.com',
        checkable: true,
        icon: 'cart'
    },
    {
        id: 'xy-mall-admin',
        name: 'xy-mall 管理后台',
        group: '应用站点',
        url: 'https://admin-mall.zhangzhengyang.com',
        checkable: true,
        icon: 'cart'
    },
    {
        id: 'react-travel',
        name: 'react-travel 旅行站',
        description: 'Next.js 旅行主题站',
        group: '应用站点',
        url: 'https://travel.zhangzhengyang.com',
        checkable: true,
        icon: 'globe'
    },
    {
        id: 'vitest-playground',
        name: 'Vitest 可视化学习平台',
        group: '应用站点',
        url: 'https://vitest-playground.zhangzhengyang.com',
        checkable: true,
        icon: 'flask'
    },

    // —— 文档与统计 ——
    {
        id: 'react-ui-docs',
        name: 'react-ui 组件库文档站',
        description: '本仓库文档站（dumi）',
        group: '文档与统计',
        url: 'https://xiaoye-react.zhangzhengyang.com',
        internalPort: 5900,
        checkable: true,
        icon: 'book'
    },
    {
        id: 'umami',
        name: 'Umami 访问分析',
        description: '全站访问统计面板',
        group: '文档与统计',
        url: 'https://analytics.zhangzhengyang.com',
        checkable: true,
        icon: 'chart'
    },

    // —— 面板与运维 ——
    {
        id: '1panel',
        name: '1Panel',
        description: '容器/主机管理面板（含安全入口路径）',
        group: '面板与运维',
        url: 'https://panel.zhangzhengyang.com',
        internalPort: 10086,
        checkable: true,
        icon: 'server'
    },
    {
        id: 'adminer',
        name: 'Adminer',
        description: '数据库 Web 管理界面',
        group: '面板与运维',
        url: 'https://adminer.zhangzhengyang.com',
        internalPort: 8081,
        checkable: true,
        icon: 'database'
    },
    {
        id: 'dsm',
        name: 'DSM 黑群晖',
        description: 'DS 918+ 管理界面（自签证书，仅直连）',
        group: '面板与运维',
        url: 'https://106.15.35.71:5001',
        internalPort: 5001,
        checkable: false,
        icon: 'server'
    },
    {
        id: 'minio-console',
        name: 'MinIO Console',
        description: '对象存储控制台（HTTP，混合内容受限）',
        group: '面板与运维',
        url: 'http://106.15.35.71:19001',
        internalPort: 19001,
        checkable: false,
        icon: 'box'
    },
    {
        id: 'nacos',
        name: 'Nacos 控制台',
        description: '注册/配置中心（HTTP）',
        group: '面板与运维',
        url: 'http://106.15.35.71:18848',
        internalPort: 18848,
        checkable: false,
        icon: 'compass'
    },
    {
        id: 'elasticsearch',
        name: 'Elasticsearch',
        description: '8.15.3 单节点（HTTP API）',
        group: '面板与运维',
        url: 'http://106.15.35.71:19200',
        internalPort: 19200,
        checkable: false,
        icon: 'search'
    },

    // —— 数据库与中间件（TCP-only，不参与 HTTP 探测）——
    {
        id: 'mysql',
        name: 'MySQL 8.4',
        description: 'dev-stack 主库（frp 13306，家宽白名单）',
        group: '数据库与中间件',
        url: '',
        internalPort: 3306,
        checkable: false,
        icon: 'database'
    },
    {
        id: 'postgres',
        name: 'PostgreSQL 16',
        description: 'dev-stack 库（frp 15433）',
        group: '数据库与中间件',
        url: '',
        internalPort: 5433,
        checkable: false,
        icon: 'database'
    },
    {
        id: 'redis',
        name: 'Redis 7',
        description: 'dev-stack 缓存（frp 16379）',
        group: '数据库与中间件',
        url: '',
        internalPort: 6379,
        checkable: false,
        icon: 'bolt'
    },
    {
        id: 'minio-api',
        name: 'MinIO S3 API',
        description: '对象存储 API（frp 19000）',
        group: '数据库与中间件',
        url: '',
        internalPort: 9000,
        checkable: false,
        icon: 'box'
    }
]

export const SERVICE_GROUPS: ServiceGroup[] = ['应用站点', '文档与统计', '面板与运维', '数据库与中间件']
