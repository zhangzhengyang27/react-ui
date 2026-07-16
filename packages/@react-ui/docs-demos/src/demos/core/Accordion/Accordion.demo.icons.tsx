import { CameraIcon, ImageIcon, PrinterIcon } from '@phosphor-icons/react';
import { Accordion } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ImageIcon, PrinterIcon, CameraIcon } from '@phosphor-icons/react';
import { Accordion } from '@react-ui/ui';

function Demo() {
  return (
    <Accordion variant="filled" defaultValue="photos" order={3}>
      <Accordion.Item value="photos">
        <Accordion.Control
          icon={<ImageIcon size={22} color="var(--ui-color-dimmed)" />}
        >
          Recent photos
        </Accordion.Control>
        <Accordion.Panel>内容</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="print">
        <Accordion.Control
          icon={<PrinterIcon size={22} color="var(--ui-color-dimmed)" />}
        >
          Print photos
        </Accordion.Control>
        <Accordion.Panel>内容</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="camera">
        <Accordion.Control
          icon={<CameraIcon size={22} color="var(--ui-color-dimmed)" />}
        >
          CameraIcon settings
        </Accordion.Control>
        <Accordion.Panel>内容</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
`;

function Demo() {
  return (
    <Accordion variant="filled" defaultValue="photos" order={3} mih={200}>
      <Accordion.Item value="photos">
        <Accordion.Control icon={<ImageIcon size={22} color="var(--ui-color-dimmed)" />}>
          Recent photos
        </Accordion.Control>
        <Accordion.Panel>内容</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="print">
        <Accordion.Control icon={<PrinterIcon size={22} color="var(--ui-color-dimmed)" />}>
          Print photos
        </Accordion.Control>
        <Accordion.Panel>内容</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="camera">
        <Accordion.Control icon={<CameraIcon size={22} color="var(--ui-color-dimmed)" />}>
          CameraIcon settings
        </Accordion.Control>
        <Accordion.Panel>内容</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export const icons: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 400,
  centered: true,
  defaultExpanded: false,
};
