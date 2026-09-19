import { useRef, useState } from 'react';
import {
  Button,
  DataTableColumn,
  Group,
  Modal,
  NativeSelect,
  notifications,
  Stack,
  TextInput,
} from '@xiaoye-react/ui';
import { PageContainer, ProTable } from '@xiaoye-react/pro';
import type { ProTableRequestParams } from '@xiaoye-react/pro';
import { UIDemo } from '@xiaoye-react/demo';

interface Member {
  id: string;
  name: string;
  department: string;
  city: string;
}

let db: Member[] = [
  { id: 'E-1001', name: '张伟', department: '研发部', city: '杭州' },
  { id: 'E-1002', name: '李静', department: '产品设计', city: '上海' },
  { id: 'E-1003', name: '王强', department: '研发部', city: '北京' },
  { id: 'E-1004', name: '赵敏', department: '市场部', city: '广州' },
  { id: 'E-1005', name: '陈晨', department: '人力资源', city: '深圳' },
  { id: 'E-1006', name: '刘洋', department: '研发部', city: '成都' },
  { id: 'E-1007', name: '杨帆', department: '产品设计', city: '杭州' },
  { id: 'E-1008', name: '黄蕾', department: '财务部', city: '上海' },
  { id: 'E-1009', name: '周杰', department: '研发部', city: '南京' },
  { id: 'E-1010', name: '吴兰', department: '市场部', city: '武汉' },
  { id: 'E-1011', name: '郑爽', department: '财务部', city: '西安' },
  { id: 'E-1012', name: '孙明', department: '研发部', city: '苏州' },
];

const departmentOptions = ['研发部', '产品设计', '市场部', '人力资源', '财务部'];
let idCounter = 2000;

// 模拟远端接口：关键词搜索 + 分页
function fakeQuery(params: ProTableRequestParams) {
  const keyword = (params.search?.keyword as string)?.trim() ?? '';
  const filtered = db.filter(
    (item) => !keyword || item.name.includes(keyword) || item.department.includes(keyword)
  );
  const start = (params.page - 1) * params.pageSize;
  return Promise.resolve({
    records: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  });
}

function fakeSave(member: Member) {
  db = db.some((item) => item.id === member.id)
    ? db.map((item) => (item.id === member.id ? member : item))
    : [{ ...member, id: `E-${++idCounter}` }, ...db];
  return new Promise((resolve) => setTimeout(resolve, 300));
}

const columns: DataTableColumn<Member>[] = [
  { accessor: 'id', title: '工号', width: 110 },
  { accessor: 'name', title: '姓名', width: 120 },
  { accessor: 'department', title: '部门', width: 140 },
  { accessor: 'city', title: '城市' },
];

const code = `
// 完整 CRUD 列表页：PageContainer 页面骨架 + ProTable 查询列表 + Modal 编辑表单
// （演示中省略 fakeQuery/fakeSave 两个模拟接口的实现）

function Demo() {
  const actionsRef = useRef<{ refresh: () => void } | null>(null);
  const [editing, setEditing] = useState<Member | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const openCreate = () => {
    setEditing({ id: '', name: '', department: '研发部', city: '' });
    setModalOpened(true);
  };

  const handleSubmit = async () => {
    if (!editing) return;
    await fakeSave(editing);
    notifications.show({ message: '保存成功', color: 'teal' });
    setModalOpened(false);
    actionsRef.current?.refresh(); // 保存后刷新列表
  };

  return (
    <PageContainer
      title="成员管理"
      subtitle="维护平台成员信息"
      extra={
        <Button size="xs" onClick={openCreate}>
          新建成员
        </Button>
      }
    >
      <ProTable
        columns={columns}
        rowKey={(record) => record.id}
        request={fakeQuery}
        defaultPageSize={5}
        actionsRef={actionsRef}
        toolbar={
          <Button size="xs" variant="default" onClick={openCreate}>
            新建
          </Button>
        }
        search={{ fields: [{ name: 'keyword', type: 'text', label: '关键词', placeholder: '姓名 / 部门' }] }}
        dataTableProps={{ striped: true, pageSizeOptions: [5, 10] }}
      />

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editing?.id ? '编辑成员' : '新建成员'}
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="姓名"
            value={editing?.name ?? ''}
            onChange={(e) => setEditing({ ...editing!, name: e.currentTarget.value })}
          />
          <NativeSelect
            label="部门"
            data={departmentOptions}
            value={editing?.department}
            onChange={(e) => setEditing({ ...editing!, department: e.currentTarget.value })}
          />
          <TextInput
            label="城市"
            value={editing?.city ?? ''}
            onChange={(e) => setEditing({ ...editing!, city: e.currentTarget.value })}
          />
          <Group justify="flex-end" mt="xs">
            <Button variant="default" size="xs" onClick={() => setModalOpened(false)}>
              取消
            </Button>
            <Button size="xs" onClick={handleSubmit}>
              保存
            </Button>
          </Group>
        </Stack>
      </Modal>
    </PageContainer>
  );
}
`;

function Demo() {
    const actionsRef = useRef<{ refresh: () => void } | null>(null);
    const [editing, setEditing] = useState<Member | null>(null);
    const [modalOpened, setModalOpened] = useState(false);

    const openCreate = () => {
        setEditing({ id: '', name: '', department: '研发部', city: '' });
        setModalOpened(true);
    };

    const handleSubmit = async () => {
        if (!editing) return;
        await fakeSave(editing);
        notifications.show({ message: '保存成功', color: 'teal' });
        setModalOpened(false);
        actionsRef.current?.refresh();
    };

    return (
        <PageContainer
            title="成员管理"
            subtitle="维护平台成员信息"
            extra={
                <Button size="xs" onClick={openCreate}>
                    新建成员
                </Button>
            }
        >
            <ProTable
                columns={columns}
                rowKey={record => record.id}
                request={fakeQuery}
                defaultPageSize={5}
                actionsRef={actionsRef}
                search={{
                    fields: [{ name: 'keyword', type: 'text', label: '关键词', placeholder: '姓名 / 部门' }]
                }}
                dataTableProps={{ striped: true, pageSizeOptions: [5, 10] }}
            />

            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={editing?.id ? '编辑成员' : '新建成员'}
                size="sm"
            >
                <Stack gap="sm">
                    <TextInput
                        label="姓名"
                        value={editing?.name ?? ''}
                        onChange={event => setEditing({ ...editing!, name: event.currentTarget.value })}
                    />
                    <NativeSelect
                        label="部门"
                        data={departmentOptions}
                        value={editing?.department}
                        onChange={event => setEditing({ ...editing!, department: event.currentTarget.value })}
                    />
                    <TextInput
                        label="城市"
                        value={editing?.city ?? ''}
                        onChange={event => setEditing({ ...editing!, city: event.currentTarget.value })}
                    />
                    <Group justify="flex-end" mt="xs">
                        <Button variant="default" size="xs" onClick={() => setModalOpened(false)}>
                            取消
                        </Button>
                        <Button size="xs" onClick={handleSubmit}>
                            保存
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </PageContainer>
    );
}

export const crud: UIDemo = { type: 'code', code, component: Demo };
