import { HeartIcon } from '@phosphor-icons/react';
import { Button } from '@react-ui/ui';

export function MdxSponsorButton() {
  return (
    <Button
      rightSection={<HeartIcon weight="fill" size={22} color="var(--mantine-color-red-7)" />}
      size="lg"
      miw={300}
      justify="space-between"
      variant="default"
      radius="md"
      component="a"
      href="https://github.com/xiaoye/react-ui"
    >
      在 GitHub 上支持 ReactUI
    </Button>
  );
}
