import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { SpotlightActionData } from '@xiaoye-react/spotlight';
import { UIDemo } from '@xiaoye-react/demo';
import { SpotlightDemoBase } from './_demo-base';

const code = `
import { Button } from '@xiaoye-react/ui';
import { Spotlight, SpotlightActionData, spotlight } from '@xiaoye-react/spotlight';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const actions: SpotlightActionData[] = Array(100)
  .fill(0)
  .map((_, index) => ({
    id: \`action-\${index}\`,
    label: \`Action \${index}\`,
    description: \`Action \${index} description\`,
  }));

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>打开聚光灯</Button>
      <Spotlight
        actions={actions}
        nothingFound="未找到..."
        highlightQuery
        scrollable
        maxHeight={350}
        searchProps={{
          leftSection: <MagnifyingGlassIcon size={20} />,
          placeholder: '搜索...',
        }}
      />
    </>
  );
}
`;

const actions: SpotlightActionData[] = Array(100)
  .fill(0)
  .map((_, index) => ({
    id: `action-${index}`,
    label: `Action ${index}`,
    description: `Action ${index} description`,
  }));

function Demo() {
  return (
    <SpotlightDemoBase
      actions={actions}
      nothingFound="未找到..."
      highlightQuery
      scrollable
      maxHeight={350}
      shortcut={null}
      searchProps={{
        leftSection: <MagnifyingGlassIcon size={20} />,
        placeholder: '搜索...',
      }}
    />
  );
}

export const scrollable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
