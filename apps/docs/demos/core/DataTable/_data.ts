export interface Employee {
    id: string
    name: string
    department: string
    city: string
    salary: number
    onboard: string
}

/** 生成 n 条模拟数据，用于虚拟滚动演示 */
export function generateEmployees(n: number): Employee[] {
    const familyNames = ['张', '李', '王', '赵', '陈', '刘', '杨', '黄']
    const givenNames = ['伟', '静', '强', '敏', '晨', '洋', '帆', '蕾']
    const departments = ['研发部', '产品设计', '市场部', '人力资源', '财务部']
    const cities = ['杭州', '上海', '北京', '广州', '深圳', '成都']

    return Array.from({ length: n }, (_, index) => ({
        id: `E-${1000 + index}`,
        name: `${familyNames[index % familyNames.length]}${givenNames[(index * 7) % givenNames.length]}`,
        department: departments[index % departments.length],
        city: cities[index % cities.length],
        salary: 12000 + (index * 137) % 20000,
        onboard: `20${18 + (index % 8)}-0${1 + (index % 9)}-1${index % 9}`
    }))
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
