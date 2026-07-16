import { Box, Spoiler, SpoilerProps, Text } from '@react-ui/ui';

const content = (
  <div>
    <Box
      component="img"
      h={150}
      ml={20}
      mb={0}
      mt={5}
      maw="100%"
      style={{ float: 'right' }}
      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2UzZTNmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NSI+UGxhY2Vob2xkZXIgaW1hZ2U8L3RleHQ+PC9zdmc+"
      alt="Placeholder"
    />
    <Text>
      We Butter the Bread with Butter was founded in 2007 by Marcel Neumann, who was originally
      guitarist for Martin Kesici&apos;s band, and Tobias Schultka. The band was originally meant as
      a joke, but progressed into being a more serious musical duo. The name for the band has no
      particular meaning, although its origins were suggested from when the two original members
      were driving in a car operated by Marcel Neumann and an accident almost occurred. Neumann
      found Schultka &quot;so funny that he briefly lost control of the vehicle.&quot; Many of their
      songs from this point were covers of German folk tales and nursery rhymes.
    </Text>
  </div>
);

export function Wrapper(props: Partial<SpoilerProps>) {
  return (
    <Box maw={520} mx="auto">
      <Spoiler maxHeight={120} showLabel="显示更多" hideLabel="隐藏" {...props}>
        {content}
      </Spoiler>
    </Box>
  );
}
