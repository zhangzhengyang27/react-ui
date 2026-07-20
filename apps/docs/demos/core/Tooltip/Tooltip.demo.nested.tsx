import { Button, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="顶部" position="top" closeDelay={1500}>
      <Tooltip label="底部" position="bottom" openDelay={500} closeDelay={1000}>
        <Tooltip label="左侧" position="left" openDelay={1000} closeDelay={500}>
          <Tooltip label="右侧" position="right" openDelay={1500}>
            <Button>嵌套提示</Button>
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="顶部" position="top" closeDelay={1500}>
      <Tooltip label="底部" position="bottom" openDelay={500} closeDelay={1000}>
        <Tooltip label="左侧" position="left" openDelay={1000} closeDelay={500}>
          <Tooltip label="右侧" position="right" openDelay={1500}>
            <Button>嵌套提示</Button>
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </Tooltip>
  );
}

export const nested: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
