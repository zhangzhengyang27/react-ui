import React from 'react';
import { AiOutlineDash, AiOutlineExport } from 'react-icons/ai';
import { Anchor, Badge, Stack, Text } from '@xiaoye-react/ui';
import { COMMUNITY_TEMPLATES_DATA } from './community-data';
import { TEMPLATES_DATA, type Template } from './data';

import classes from './index.module.css';

interface TemplatesListProps {
  community?: boolean;
  type?: Template['type'];
  name?: string[];
}

const FRAMEWORK_LABEL: Record<Template['type'], string> = {
  next: 'Next.js',
  vite: 'Vite',
  gatsby: 'Gatsby',
  redwood: 'Redwood',
  'react-router': 'React Router',
};

const FRAMEWORK_COLOR: Record<Template['type'], string> = {
  next: '#000000',
  vite: '#646cff',
  gatsby: '#663399',
  redwood: '#bf4722',
  'react-router': '#ca4245',
};

const TemplatesList: React.FC<TemplatesListProps> = ({ type, name, community = false }) => {
  const templatesData = community ? COMMUNITY_TEMPLATES_DATA : TEMPLATES_DATA;

  const data = name
    ? templatesData.filter((template) => name.includes(template.name))
    : type
      ? templatesData.filter((template) => template.type === type)
      : templatesData;

  return (
    <div className={classes.wrapper}>
      {community && (
        <div className={classes.communityBanner}>
          <AiOutlineDash className={classes.bannerIcon} />
          <div className={classes.bannerContent}>
            <Text fw={600} size="sm">
              你的模板
            </Text>
            <Text size="xs" c="dimmed">
              使用你的技术栈创建模板并分享给社区
            </Text>
          </div>
          <Anchor
            component="a"
            href="https://github.com/xiaoye/react-ui/discussions"
            target="_blank"
            size="sm"
          >
            提交模板
          </Anchor>
        </div>
      )}
      <table className={classes.table}>
        <tbody>
          {data.map((record, index) => (
            <tr key={String(index)} className={classes.row}>
              <td className={classes.cellType}>
                <Badge
                  size="sm"
                  variant="filled"
                  style={{ backgroundColor: FRAMEWORK_COLOR[record.type], margin: 0 }}
                >
                  {FRAMEWORK_LABEL[record.type]}
                </Badge>
              </td>
              <td className={classes.cellName}>
                <Stack gap={0}>
                  <Text fw={600} size="sm">
                    {record.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {record.description}
                  </Text>
                </Stack>
              </td>
              <td className={classes.cellAction}>
                <Anchor
                  component="a"
                  href={record.link}
                  target="_blank"
                  size="sm"
                  leftSection={<AiOutlineExport />}
                >
                  使用模板
                </Anchor>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemplatesList;
