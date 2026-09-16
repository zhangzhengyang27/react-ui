import { useRef, useState } from 'react';
import {
  Button,
  DataTableColumn,
  Drawer,
  Group,
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
  { id: 'E-2001', name: '张伟', department: '研发部', city: '杭州' },
  { id: 'E-2002', name: '李静', department: '产品设计', city: '上海' },
  { id: 'E-2003', name: '王强', department: '研发部', city: '北京' },
  { id: 'E-2004', name: '赵敏', department: '市场部', city: '广州' },
  { id: 'E-2005', name: '陈晨', department: '人力资源', city: '深圳' },
  { id: 'E-2006', name: '刘洋', department: '研发部', city: '成都' },
];

const departmentOptions = ['研发部', '产品设计', '市场部', '人力资源', '财务部'];
let idCounter = 3000;

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
  const error = !member.name.trim() ? '姓名不能为空' : null;
  if (error) {
    return Promise.reject(new Error(error));
  }
  db = db.some((item) => item.id === member.id)
    ? db.map((item) => (item.id === member.id ? member : item))
    : [{ ...member, id: `E-${++idCounter}` }, ...db];
  return new Promise((resolve) => setTimeout(resolve, 300));
}

const columns: DataTableColumn<Member>[] = [
  { accessor: 'id', title: '工号', width: 110 },
  { accessor: 'name', title: '姓名', width: 120 },
  { accessor: 'department', title: '部门' },
  {
    accessor: 'actions',
    title: '操作',
    width: 90,
    render: (record) => (
      <Button variant="subtle" size="compact-xs" onClick={() => openEdit(record)}>
        编辑
      </Button>
    ),
  },
];

const code = `
// 列表 + Drawer 编辑：适合字段较多、需要更大编辑空间的场景
// （演示中省略 fakeQuery/fakeSave 两个模拟接口的实现）

function Demo() {
  const actionsRef = useRef<{ refresh: () => void } | null>(null);
  const [editing, setEditing] = useState<Member | null>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing({ id: '', name: '', department: '研发部', city: '' });
    setFormError(null);
    setDrawerOpened(true);
  };

  const openEdit = (record: Member) => {
    setEditing(record);
    setFormError(null);
    setDrawerOpened(true);
  };

  const handleSubmit = async () => {
    if (!editing) return;
    try {
      await fakeSave(editing);
      notifications.show({ message: '保存成功', color: 'teal' });
      setDrawerOpened(false);
      actionsRef.current?.refresh();
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  return (
    <PageContainer
      title="成员管理"
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
        actionsRef={actionsRef}
        search={{ fields: [{ name: 'keyword', type: 'text', label: '关键词' }] }}
        striped
      />

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={editing?.id ? '编辑成员' : '新建成员'}
        position="right"
      >
        <Stack gap="sm">
          <TextInput
            label="姓名"
            error={formError ?? undefined}
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
          <Group justify="flex-end" mt="md">
            <Button variant="default" size="xs" onClick={() => setDrawerOpened(false)}>
              取消
            </Button>
            <Button size="xs" onClick={handleSubmit}>
              保存
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </PageContainer>
  );
}
`;

let openEdit: (record: Member) => void = () => {};

function Demo() {
    const actionsRef = useRef<{ refresh: () => void } | null>(null);
    const [editing, setEditing] = useState<Member | null>(null);
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const openCreate = () => {
        setEditing({ id: '', name: '', department: '研发部', city: '' });
        setFormError(null);
        setDrawerOpened(true);
    };

    // 列 render 闭包需要访问最新状态，通过模块级引用中转
    openEdit = (record: Member) => {
        setEditing(record);
        setFormError(null);
        setDrawerOpened(true);
    };

    const handleSubmit = async () => {
        if (!editing) return;
        try {
            await fakeSave(editing);
            notifications.show({ message: '保存成功', color: 'teal' });
            setDrawerOpened(false);
            actionsRef.current?.refresh();
        } catch (error) {
            setFormError((error as Error).message);
        }
    };

    return (
        <PageContainer
            title="成员管理"
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
                actionsRef={actionsRef}
                search={{ fields: [{ name: 'keyword', type: 'text', label: '关键词' }] }}
                striped
            />

            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                title={editing?.id ? '编辑成员' : '新建成员'}
                position="right"
            >
                <Stack gap="sm">
                    <TextInput
                        label="姓名"
                        error={formError ?? undefined}
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
                    <Group justify="flex-end" mt="md">
                        <Button variant="default" size="xs" onClick={() => setDrawerOpened(false)}>
                            取消
                        </Button>
                        <Button size="xs" onClick={handleSubmit}>
                            保存
                        </Button>
                    </Group>
                </Stack>
            </Drawer>
        </PageContainer>
    );
}

export const drawerEdit: UIDemo = { type: 'code', code, component: Demo };
