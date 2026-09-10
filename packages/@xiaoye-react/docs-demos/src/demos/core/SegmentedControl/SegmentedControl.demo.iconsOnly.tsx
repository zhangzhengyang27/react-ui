import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/csr/ArrowSquareOut'
import { CodeIcon } from '@phosphor-icons/react/dist/csr/Code'
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye'
import { SegmentedControl, VisuallyHidden } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { SegmentedControl, VisuallyHidden } from '@xiaoye-react/ui';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { CodeIcon } from '@phosphor-icons/react/dist/csr/Code';
import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/csr/ArrowSquareOut';
function Demo() {
  const iconProps = {
    style: { display: 'block' },
    size: 20,

  };

  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <>
              <EyeIcon {...iconProps} />
              <VisuallyHidden>预览</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'code',
          label: (
            <>
              <CodeIcon {...iconProps} />
              <VisuallyHidden>代码</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'export',
          label: (
            <>
              <ArrowSquareOutIcon {...iconProps} />
              <VisuallyHidden>导出</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
}
`

function Demo() {
    const iconProps = {
        style: { display: 'block' },
        size: 20
    }

    return (
        <SegmentedControl
            data={[
                {
                    value: 'preview',
                    label: (
                        <>
                            <EyeIcon {...iconProps} />
                            <VisuallyHidden>预览</VisuallyHidden>
                        </>
                    )
                },
                {
                    value: 'code',
                    label: (
                        <>
                            <CodeIcon {...iconProps} />
                            <VisuallyHidden>代码</VisuallyHidden>
                        </>
                    )
                },
                {
                    value: 'export',
                    label: (
                        <>
                            <ArrowSquareOutIcon {...iconProps} />
                            <VisuallyHidden>导出</VisuallyHidden>
                        </>
                    )
                }
            ]}
        />
    )
}

export const iconsOnly: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
