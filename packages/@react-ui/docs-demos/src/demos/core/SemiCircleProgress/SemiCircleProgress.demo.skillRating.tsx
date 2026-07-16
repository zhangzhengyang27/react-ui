import { useState } from 'react';
import { Group, SemiCircleProgress, Stack, Text, UnstyledButton } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { SemiCircleProgress, Stack, Text } from '@react-ui/ui';
import { useState } from 'react';

const colors = ['red', 'orange', 'yellow', 'lime', 'green'];

function Demo() {
  const [skillLevel, setSkillLevel] = useState(4);

  return (
    <Stack align="center" gap="md">
      <div style={{ position: 'relative', width: 200, height: 120 }}>
        <SemiCircleProgress
          value={(skillLevel / 5) * 100}
          filledSegmentColor={colors[skillLevel - 1] || 'gray'}
          label={<Text fz={36} fw={800} pb={30}>{\`\${skillLevel}/5\`}</Text>}
          labelPosition="center"
          orientation="down"
          size={200}
          thickness={12}
        />
      </div>

      <Text size="sm" c="dimmed">
        Skill Rating
      </Text>

      <div style={{ display: 'flex', gap: 8 }}>
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => setSkillLevel(level)}
            style={{
              padding: '4px 12px',
              backgroundColor: skillLevel === level ? '#087f5b' : '#e7f5f0',
              color: skillLevel === level ? 'white' : '#087f5b',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {level}
          </button>
        ))}
      </div>
    </Stack>
  );
}
`;

const colors = ['red', 'orange', 'yellow', 'lime', 'green'];

function Demo() {
  const [skillLevel, setSkillLevel] = useState(4);

  return (
    <Stack align="center" gap="xs">
      <div style={{ position: 'relative', width: 200, height: 120 }}>
        <SemiCircleProgress
          value={(skillLevel / 5) * 100}
          filledSegmentColor={colors[skillLevel - 1] || 'gray'}
          label={<Text fz={36} fw={800} pb={30}>{`${skillLevel}/5`}</Text>}
          labelPosition="center"
          orientation="down"
          size={200}
          thickness={12}
        />
      </div>
      <Text size="sm" c="dimmed">
        Skill Rating
      </Text>
      <Group gap="xs">
        {[1, 2, 3, 4, 5].map((level) => (
          <UnstyledButton
            key={level}
            onClick={() => setSkillLevel(level)}
            px="sm"
            py={4}
            bg={skillLevel === level ? '#087f5b' : '#e7f5f0'}
            c={skillLevel === level ? 'white' : '#087f5b'}
            style={{ borderRadius: 4 }}
          >
            {level}
          </UnstyledButton>
        ))}
      </Group>
    </Stack>
  );
}

export const skillRating: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
  centered: true,
};
