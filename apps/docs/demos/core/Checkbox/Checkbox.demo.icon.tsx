import { BiohazardIcon } from '@phosphor-icons/react/dist/csr/Biohazard'
import { RadioactiveIcon } from '@phosphor-icons/react/dist/csr/Radioactive'
import { Checkbox } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Checkbox } from '@xiaoye-react/ui';
import { BiohazardIcon } from '@phosphor-icons/react/dist/csr/Biohazard';
import { RadioactiveIcon } from '@phosphor-icons/react/dist/csr/Radioactive';

// icon 回调入参为 { indeterminate, checked }
const CheckboxIcon = ({ indeterminate }: { indeterminate: boolean; checked: boolean }) =>
  indeterminate ? <RadioactiveIcon /> : <BiohazardIcon />;

function Demo() {
  return (
    <>
      <Checkbox icon={CheckboxIcon} label="自定义图标" defaultChecked />
      <Checkbox icon={CheckboxIcon} label="自定义图标：不确定" indeterminate mt="sm" />
    </>
  );
}
`

// Checkbox 的 icon 回调入参是 { indeterminate, checked },不存在 CheckboxIconComponent 类型
const CheckboxIcon = ({ indeterminate }: { indeterminate: boolean; checked: boolean }) =>
    indeterminate ? <RadioactiveIcon /> : <BiohazardIcon />

function Demo() {
    return (
        <>
            <Checkbox icon={CheckboxIcon} label="自定义图标" defaultChecked />
            <Checkbox icon={CheckboxIcon} label="自定义图标：不确定" indeterminate mt="sm" />
        </>
    )
}

export const icon: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
