import { Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <button type="button" className="ui-focus-auto">
        Focus auto
      </button>
      <button type="button" className="ui-focus-always">
        Focus always
      </button>
      <button type="button" className="ui-focus-never">
        Focus never
      </button>
      <button type="button" className="ui-active">
        Active
      </button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <button type="button" className="ui-focus-auto">
        Focus auto
      </button>
      <button type="button" className="ui-focus-always">
        Focus always
      </button>
      <button type="button" className="ui-focus-never">
        Focus never
      </button>
      <button type="button" className="ui-active">
        Active
      </button>
    </Group>
  );
}

export const globalClasses: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
