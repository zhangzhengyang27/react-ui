import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { ArrowLineLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLineLeft'
import { ArrowLineRightIcon } from '@phosphor-icons/react/dist/csr/ArrowLineRight'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { DotsSixIcon } from '@phosphor-icons/react/dist/csr/DotsSix'
import { Group, Pagination } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Group, Pagination } from '@xiaoye-react/ui';
import { ArrowLineRightIcon } from '@phosphor-icons/react/dist/csr/ArrowLineRight';
import { ArrowLineLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLineLeft';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { DotsSixIcon } from '@phosphor-icons/react/dist/csr/DotsSix';
function Demo() {
  return (
    <>
      {/* Regular pagination */}
      <Pagination
        total={10}
        withEdges
        nextIcon={ArrowRightIcon}
        previousIcon={ArrowLeftIcon}
        firstIcon={ArrowLineLeftIcon}
        lastIcon={ArrowLineRightIcon}
        dotsIcon={DotsSixIcon}
      />

      {/* Compound pagination */}
      <Pagination.Root total={10}>
        <Group gap={7} mt="xl">
          <Pagination.First icon={ArrowLineLeftIcon} />
          <Pagination.Previous icon={ArrowLeftIcon} />
          <Pagination.Items dotsIcon={DotsSixIcon} />
          <Pagination.Next icon={ArrowRightIcon} />
          <Pagination.Last icon={ArrowLineRightIcon} />
        </Group>
      </Pagination.Root>
    </>
  );
}
`

function Demo() {
    return (
        <>
            {/* Regular pagination */}
            <Pagination
                total={10}
                withEdges
                nextIcon={ArrowRightIcon}
                previousIcon={ArrowLeftIcon}
                firstIcon={ArrowLineLeftIcon}
                lastIcon={ArrowLineRightIcon}
                dotsIcon={DotsSixIcon}
            />

            {/* Compound pagination */}
            <Pagination.Root total={10}>
                <Group gap={7} mt="xl">
                    <Pagination.First icon={ArrowLineLeftIcon} />
                    <Pagination.Previous icon={ArrowLeftIcon} />
                    <Pagination.Items dotsIcon={DotsSixIcon} />
                    <Pagination.Next icon={ArrowRightIcon} />
                    <Pagination.Last icon={ArrowLineRightIcon} />
                </Group>
            </Pagination.Root>
        </>
    )
}

export const icons: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
