'use client'

import { Fieldset, TextInput } from '@react-ui/ui'

export default function FieldsetBasicDemo() {
    return (
        <Fieldset legend="个人信息">
            <TextInput label="姓名" placeholder="请输入姓名" />
            <TextInput label="邮箱" placeholder="请输入邮箱" style={{ marginTop: 12 }} />
        </Fieldset>
    )
}
