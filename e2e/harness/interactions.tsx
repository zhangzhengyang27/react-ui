import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
    Button,
    DataTable,
    Group,
    Modal,
    Slider,
    Stack,
    Text,
    UIProvider
} from '@xiaoye-react/ui'
import classes from './interactions.module.css'

/**
 * 交互 spec 专用 fixtures（独立页面，不与 main.tsx 的既有用例抢启动）：
 * - virtual-table：虚拟化滚动定位 + 展开行「主行+展开行」合成高度测量
 * - slider-drag：thumb 装饰层的 pointer-events 继承、隐式指针捕获拖出边界、keyup 补发 onChangeEnd
 * - modal-focus / modal-stack：portal 内焦点陷阱、关闭后焦点归还、Escape 只关最上层
 */

const tableRecords = Array.from({ length: 2000 }, (_, i) => ({
    id: `R${i + 1}`,
    name: `用户 ${i + 1}`
}))

function VirtualTableFixture() {
    return (
        <div data-testid="virtual-table">
            <DataTable
                columns={[
                    { accessor: 'id', title: '工号', width: 90 },
                    { accessor: 'name', title: '姓名' }
                ]}
                records={tableRecords}
                virtualized
                maxHeight={360}
                estimatedRowHeight={40}
                rowKey={record => record.id}
                renderExpanded={record => (
                    <div data-testid="expanded-detail" className={classes.detailBox}>
                        detail of {record.id}
                    </div>
                )}
            />
        </div>
    )
}

function SliderDragFixture() {
    const [changes, setChanges] = useState<number[]>([])
    const [ends, setEnds] = useState<number[]>([])

    return (
        <div data-testid="slider-drag">
            <Slider
                defaultValue={20}
                thumbLabel="volume"
                thumbChildren={<span data-testid="slider-thumb" />}
                onChange={value => setChanges(prev => [...prev, value])}
                onChangeEnd={value => setEnds(prev => [...prev, value])}
            />
            <Group>
                <Text data-testid="slider-change-count">{changes.length}</Text>
                <Text data-testid="slider-end-values">{ends.join(',')}</Text>
            </Group>
        </div>
    )
}

function ModalFocusFixture() {
    const [opened, setOpened] = useState(false)

    return (
        <div data-testid="modal-focus">
            <input data-testid="outside-input" aria-label="outside" />
            <Button onClick={() => setOpened(true)}>open-modal</Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="焦点测试" centered>
                <div data-autofocus data-testid="autofocus-target" tabIndex={0}>
                    自动聚焦
                </div>
                <button data-testid="modal-action" type="button">
                    确认
                </button>
                <Button onClick={() => setOpened(false)}>close-modal</Button>
            </Modal>
        </div>
    )
}

function ModalStackFixture() {
    const [outerOpened, setOuterOpened] = useState(false)
    const [innerOpened, setInnerOpened] = useState(false)

    return (
        <div data-testid="modal-stack">
            <Button onClick={() => setOuterOpened(true)}>open-outer</Button>
            <Modal opened={outerOpened} onClose={() => setOuterOpened(false)} title="外层" centered>
                <Button onClick={() => setInnerOpened(true)}>open-inner</Button>
                <Text data-testid="outer-body">outer body</Text>
            </Modal>
            <Modal opened={innerOpened} onClose={() => setInnerOpened(false)} title="内层" centered>
                <Text data-testid="inner-body">inner body</Text>
            </Modal>
        </div>
    )
}

function Fixtures() {
    return (
        <Stack p="md" gap="lg">
            <VirtualTableFixture />
            <SliderDragFixture />
            <ModalFocusFixture />
            <ModalStackFixture />
        </Stack>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UIProvider>
            <Fixtures />
        </UIProvider>
    </StrictMode>
)
