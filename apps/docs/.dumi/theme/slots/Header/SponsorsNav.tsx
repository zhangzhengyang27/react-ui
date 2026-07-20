import React from 'react';
import { HoverCard } from '@react-ui/ui';

import useLocale from '../../../hooks/useLocale';
import SponsorCard from './SponsorCard';
import { getSponsorUrl, sponsors } from './sponsors';
import classes from './SponsorsNav.module.css';

const SponsorsNav: React.FC = () => {
  const [, lang] = useLocale();

  return (
    <div className={classes.wrap} aria-label="Sponsors">
      {sponsors.map((sponsor) => (
        <HoverCard
          key={sponsor.name}
          position="bottom-end"
          withArrow
          arrowPosition="center"
          openDelay={100}
          closeDelay={100}
        >
          <HoverCard.Target>
            <a
              href={getSponsorUrl(sponsor.url, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.avatarLink}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={classes.avatar}
                draggable={false}
              />
            </a>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <SponsorCard sponsor={sponsor} lang={lang} />
          </HoverCard.Dropdown>
        </HoverCard>
      ))}
    </div>
  );
};

export default SponsorsNav;
