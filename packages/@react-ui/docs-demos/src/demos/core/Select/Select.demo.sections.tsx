import { SquaresFourIcon } from '@phosphor-icons/react';
import { Select } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Select } from '@react-ui/ui';
import { SquaresFourIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <Select
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="你最喜欢的库"
        placeholder="你最喜欢的库"
      />
      <Select
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="你最喜欢的库"
        placeholder="你最喜欢的库"
      />
    </>
  );
}
`;

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <Select
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="你最喜欢的库"
        placeholder="你最喜欢的库"
      />
      <Select
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="你最喜欢的库"
        placeholder="你最喜欢的库"
      />
    </>
  );
}

export const sections: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
