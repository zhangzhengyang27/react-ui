export interface Employee {
    id: string
    name: string
    department: string
    city: string
    salary: number
    onboard: string
}

export const employees: Employee[] = [
    { id: 'E-1001', name: '张伟', department: '研发部', city: '杭州', salary: 24500, onboard: '2019-03-11' },
    { id: 'E-1002', name: '李静', department: '产品设计', city: '上海', salary: 19800, onboard: '2020-07-01' },
    { id: 'E-1003', name: '王强', department: '研发部', city: '北京', salary: 28600, onboard: '2018-11-26' },
    { id: 'E-1004', name: '赵敏', department: '市场部', city: '广州', salary: 16200, onboard: '2021-05-17' },
    { id: 'E-1005', name: '陈晨', department: '人力资源', city: '深圳', salary: 14300, onboard: '2022-02-28' },
    { id: 'E-1006', name: '刘洋', department: '研发部', city: '成都', salary: 22400, onboard: '2020-09-14' },
    { id: 'E-1007', name: '杨帆', department: '产品设计', city: '杭州', salary: 21100, onboard: '2019-12-02' },
    { id: 'E-1008', name: '黄蕾', department: '财务部', city: '上海', salary: 17800, onboard: '2021-08-23' }
]

export const departments = [
    {
        value: '研发部',
        label: '研发部',
        children: [
            { value: 'frontend', label: '前端组' },
            { value: 'backend', label: '后端组' },
            { value: 'qa', label: '测试组' }
        ]
    },
    {
        value: '产品设计',
        label: '产品设计',
        children: [
            { value: 'ux', label: '交互设计' },
            { value: 'ui', label: '视觉设计' }
        ]
    },
    { value: '市场部', label: '市场部' },
    { value: '人力资源', label: '人力资源' }
]
