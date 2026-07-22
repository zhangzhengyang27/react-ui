import React from 'react';
import { Avatar, Tooltip } from '@xiaoye-react/ui';

export interface AvatarListItem {
  username?: string;
  url?: string;
}

export interface ContributorAvatarProps {
  loading?: boolean;
  item?: AvatarListItem;
}

const ContributorAvatar: React.FC<ContributorAvatarProps> = (props) => {
  const { item: { username, url } = {} } = props;
  if (!username || !url) {
    return null;
  }
  return (
    <Tooltip label={username} position="top">
      <li>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          <Avatar src={url} alt={username} size={24}>
            {username}
          </Avatar>
        </a>
      </li>
    </Tooltip>
  );
};

export default ContributorAvatar;
