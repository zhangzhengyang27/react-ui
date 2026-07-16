import { ArrowSquareOutIcon, CircleDashedIcon } from '@phosphor-icons/react';
import { Button, Table, Text } from '@react-ui/ui';
import { frameworkIcons } from '@/components/icons';
import { COMMUNITY_TEMPLATES_DATA } from './community-data';
import { Template, TEMPLATES_DATA } from './data';
import classes from './MdxTemplatesList.module.css';

interface MdxTemplatesListProps {
  community?: boolean;
  type?: Template['type'];
  name?: string[];
}

export function MdxTemplatesList({ type, name, community = false }: MdxTemplatesListProps) {
  const templatesData = community ? COMMUNITY_TEMPLATES_DATA : TEMPLATES_DATA;

  const data = name
    ? templatesData.filter((template) => name.includes(template.name))
    : type
      ? templatesData.filter((template) => template.type === type)
      : templatesData;

  const rows = data.map((template) => {
    const Icon = frameworkIcons[template.type];
    return (
      <Table.Tr key={template.name}>
        <Table.Td className={classes.iconCell} w={70}>
          <div className={classes.icon} data-type={template.type}>
            <Icon />
          </div>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" fw={500}>
            {template.name}
          </Text>
          <Text fz="xs">{template.description}</Text>
        </Table.Td>
        <Table.Td w={146}>
          <Button
            component="a"
            href={template.link}
            target="_blank"
            size="xs"
            variant="default"
            rightSection={<ArrowSquareOutIcon className={classes.externalLinkIcon} />}
          >
            使用模板
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table highlightOnHover verticalSpacing="sm" layout="fixed">
      <Table.Tbody>
        {community && (
          <Table.Tr>
            <Table.Td className={classes.iconCell} w={70}>
              <div className={classes.icon} data-type="empty">
                <CircleDashedIcon size={40} />
              </div>
            </Table.Td>
            <Table.Td>
              <Text fz="sm" fw={500}>
                你的模板
              </Text>
              <Text fz="xs">使用你的技术栈创建模板并分享给社区</Text>
            </Table.Td>
            <Table.Td w={146}>
              <Button component="a" href="https://github.com/xiaoye/react-ui/discussions" size="xs">
                提交模板
              </Button>
            </Table.Td>
          </Table.Tr>
        )}
        {rows}
      </Table.Tbody>
    </Table>
  );
}
