import { Accordion, AccordionProps } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { AccordionStylesApi } from '@react-ui/docs-styles-api';
import { data } from './_base';

const code = `
import { Accordion } from '@react-ui/ui';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion value="Apples" order={3}{{props}}>
      {items}
    </Accordion>
  );
}
`;

function Demo(props: AccordionProps) {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion value="Apples" order={3} {...props}>
      {items}
    </Accordion>
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: AccordionStylesApi,
  component: Demo,
  centered: true,
  maxWidth: '100%',
  code,
};
