import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree'
import { Accordion, AccordionControlProps, ActionIcon, Center } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Accordion, ActionIcon, AccordionControlProps, Center } from '@xiaoye-react/ui';
import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree';
function AccordionControl(props: AccordionControlProps) {
  return (
    <Center>
      <Accordion.Control {...props} />
      <ActionIcon size="lg" variant="subtle" color="gray" aria-label="更多选项">
        <DotsThreeIcon size={20} />
      </ActionIcon>
    </Center>
  );
}

function Demo() {
  return (
    <Accordion chevronPosition="left" order={3}>
      <Accordion.Item value="item-1">
        <AccordionControl>Control 1</AccordionControl>
        <Accordion.Panel>面板 1</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="item-2">
        <AccordionControl>Control 2</AccordionControl>
        <Accordion.Panel>面板 2</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="item-3">
        <AccordionControl>Control 3</AccordionControl>
        <Accordion.Panel>面板 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
`

function AccordionControl(props: AccordionControlProps) {
    return (
        <Center>
            <Accordion.Control {...props} />
            <ActionIcon size="lg" variant="subtle" color="gray" aria-label="更多选项">
                <DotsThreeIcon size={20} />
            </ActionIcon>
        </Center>
    )
}

function Demo() {
    return (
        <Accordion chevronPosition="left" order={3}>
            <Accordion.Item value="item-1">
                <AccordionControl>Control 1</AccordionControl>
                <Accordion.Panel>面板 1</Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="item-2">
                <AccordionControl>Control 2</AccordionControl>
                <Accordion.Panel>面板 2</Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="item-3">
                <AccordionControl>Control 3</AccordionControl>
                <Accordion.Panel>面板 3</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}

export const sideControls: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    maxWidth: 400
}
