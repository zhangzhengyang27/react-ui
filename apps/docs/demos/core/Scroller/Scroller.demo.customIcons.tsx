import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Badge, Group, Scroller } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { Badge, Group, Scroller } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Scroller
      startControlIcon={<ArrowLeftIcon size={16} />}
      endControlIcon={<ArrowRightIcon size={16} />}
    >
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
`

function Demo() {
    return (
        <Scroller startControlIcon={<ArrowLeftIcon size={16} />} endControlIcon={<ArrowRightIcon size={16} />}>
            <Group gap="xs" wrap="nowrap">
                {Array.from({ length: 20 }).map((_, index) => (
                    <Badge key={index} variant="light" size="lg" miw="fit-content">
                        Badge {index + 1}
                    </Badge>
                ))}
            </Group>
        </Scroller>
    )
}

export const customIcons: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    maxWidth: 500
}
