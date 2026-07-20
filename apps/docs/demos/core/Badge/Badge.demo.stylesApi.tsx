import { AtIcon } from '@phosphor-icons/react';
import { Badge } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { BadgeStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Badge } from '@react-ui/ui';
import { AtIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <AtIcon size={12} />;

  return (
    <Badge leftSection={icon} rightSection={icon}{{props}}>
      Badge component
    </Badge>
  );
}
`;

function Demo(props: any) {
  const icon = <AtIcon size={12} />;

  return (
    <Badge leftSection={icon} rightSection={icon} {...props}>
      Badge component
    </Badge>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: BadgeStylesApi,
  component: Demo,
  centered: true,
  code,
};
