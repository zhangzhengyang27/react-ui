import { SimpleGrid, Space } from '@react-ui/ui';
import { GettingStartedCard } from './GettingStartedCard/GettingStartedCard';

export function FrameworksGuides() {
  return (
    <>
      <SimpleGrid cols={{ base: 1, '800px': 2 }} spacing="lg">
        <GettingStartedCard
          title="Vite"
          description="单页应用（SPA）的最佳选择"
          logo="vite"
          type="primary"
          link="/guides/vite"
        />
        <GettingStartedCard
          title="Next.js"
          description="支持 SSR 的应用的最佳选择"
          logo="next"
          type="primary"
          link="/guides/next"
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, '580px': 2, '920px': 3 }} mt="lg" spacing="lg">
        <GettingStartedCard
          title="React Router"
          logo="react-router"
          type="secondary"
          link="/guides/react-router"
          description="React Router 入门"
        />

        <GettingStartedCard
          title="Redwood"
          description="RedwoodJS 入门"
          logo="redwood"
          type="secondary"
          link="/guides/redwood"
        />
        <GettingStartedCard
          title="Gatsby"
          logo="gatsby"
          type="secondary"
          link="/guides/gatsby"
          description="Gatsby 入门"
        />
      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
