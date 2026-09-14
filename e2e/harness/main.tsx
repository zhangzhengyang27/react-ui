import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
    Button,
    Collapse,
    FileInput,
    MaskInput,
    NumberInput,
    Rating,
    Stack,
    UIProvider
} from '@xiaoye-react/ui'

/**
 * 真实浏览器交互盲区 harness：
 * - pointer-events 继承（NumberInput 步进 / FileInput 清除）
 * - mouseenter 先于 click（Rating clearable）
 * - transitionend 时序（Collapse duration=0 / 隐藏容器内展开）
 * - MaskInput 连续键入的光标恢复
 */
function BlindSpots() {
    const [file, setFile] = useState<File | null>(null)
    const [fastExpanded, setFastExpanded] = useState(false)
    const [wrapHidden, setWrapHidden] = useState(true)

    return (
        <Stack p="md" gap="lg">
            <section data-testid="inputs" aria-label="inputs">
                <NumberInput defaultValue={5} aria-label="number" />
                <FileInput
                    value={file}
                    onChange={setFile}
                    clearable
                    placeholder="选择文件"
                    aria-label="file"
                />
                <MaskInput mask="000-000" aria-label="mask" />
            </section>

            <section data-testid="rating" aria-label="rating">
                <Rating defaultValue={3} clearable />
            </section>

            <section data-testid="collapse-fast" aria-label="collapse-fast">
                <Button onClick={() => setFastExpanded(v => !v)}>toggle-fast</Button>
                <Collapse expanded={fastExpanded} transitionDuration={0}>
                    <div data-testid="collapse-fast-content">fast content</div>
                </Collapse>
            </section>

            <section data-testid="collapse-hidden" aria-label="collapse-hidden">
                <Button onClick={() => setWrapHidden(v => !v)}>toggle-wrap</Button>
                <div style={{ display: wrapHidden ? 'none' : 'block' }} data-testid="hidden-wrap">
                    <Collapse expanded transitionDuration={200}>
                        <div data-testid="collapse-hidden-content" style={{ height: 80 }}>
                            hidden container content
                        </div>
                    </Collapse>
                </div>
            </section>
        </Stack>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UIProvider>
            <BlindSpots />
        </UIProvider>
    </StrictMode>
)
