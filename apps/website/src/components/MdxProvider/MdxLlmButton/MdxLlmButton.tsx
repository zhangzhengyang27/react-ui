import { RobotIcon } from '@phosphor-icons/react';
import { Button } from '@react-ui/ui';

export function MdxLlmButton({ href }: { href: string }) {
  return (
    <Button
      rightSection={<RobotIcon color="var(--ui-color-red-8)" size={22} />}
      size="lg"
      miw={300}
      justify="space-between"
      variant="default"
      radius="md"
      component="a"
      href={href}
      target="_blank"
    >
      使用大语言模型迁移
    </Button>
  );
}
