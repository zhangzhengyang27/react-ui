import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { TextInput } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { TextInput } from '@xiaoye-react/ui';
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
function Demo() {
  const icon = <AtIcon size={16} />;
  return (
    <>
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="你的邮箱"
        placeholder="你的邮箱"
      />
      <TextInput
        mt="md"
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="你的邮箱"
        placeholder="你的邮箱"
      />
    </>
  );
}
`

function Demo() {
    const icon = <AtIcon size={16} />
    return (
        <>
            <TextInput leftSectionPointerEvents="none" leftSection={icon} label="你的邮箱" placeholder="你的邮箱" />
            <TextInput
                mt="md"
                rightSectionPointerEvents="none"
                rightSection={icon}
                label="你的邮箱"
                placeholder="你的邮箱"
            />
        </>
    )
}

export const sections: UIDemo = {
    type: 'code',
    component: Demo,
    maxWidth: 340,
    centered: true,
    code
}
