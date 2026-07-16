import { SimpleGrid } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { defaultItems } from './_demo-item';

const code = `
import { SimpleGrid } from '@react-ui/ui';

function Demo() {
  return (
    <SimpleGrid cols={3} autoRows="minmax(100px, auto)">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );
}
`;

function Demo() {
  return (
    <SimpleGrid cols={3} autoRows="minmax(100px, auto)">
      {defaultItems}
    </SimpleGrid>
  );
}

export const autoRows: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
