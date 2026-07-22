import { Box, Button, Collapse, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Text, Collapse, Box } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

function Demo() {
  const [expanded, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>切换内容</Button>
      </Group>

      <Collapse expanded={expanded}>
        <Text>{/* ... content */}</Text>
      </Collapse>
    </Box>
  );
}
`;

function Demo() {
  const [expanded, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>切换内容</Button>
      </Group>

      <Collapse expanded={expanded}>
        <Text>
          From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with
          darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of
          its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are
          visible in the upper jaw when its mouth is open. Each of its thick legs ends with three
          sharp claws. On Bulbasaur&apos;s back is a green plant bulb, which is grown from a seed
          planted there at birth. The bulb also conceals two slender, tentacle-like vines and
          provides it with energy through photosynthesis as well as from the nutrient-rich seeds
          contained within.
        </Text>
      </Collapse>
    </Box>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
