import React from 'react'
import { AiFillHeart } from '../../icons'
import { Anchor } from '@xiaoye-react/ui'

import type { Sponsor } from './sponsors'
import { getSponsorDescription, getSponsorUrl } from './sponsors'
import classes from './SponsorCard.module.css'

export interface SponsorCardProps {
    sponsor: Sponsor
    lang: 'cn' | 'en'
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, lang }) => {
    const isCN = lang === 'cn'
    const url = getSponsorUrl(sponsor.url, lang)
    return (
        <div className={classes.card}>
            <div className={classes.cardBody}>
                <img src={sponsor.logo} alt={sponsor.name} className={classes.cardLogo} draggable={false} />
                <div className={classes.cardInfo}>
                    <a
                        href={sponsor.opencollective}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.cardName}
                    >
                        {sponsor.name}
                    </a>
                    <span className={classes.cardDesc}>{getSponsorDescription(sponsor.description, lang)}</span>
                </div>
            </div>
            <div className={classes.cardFooter}>
                <span className={classes.sponsorLabel}>
                    <AiFillHeart className={classes.heartIcon} />
                    {isCN ? '赞助商' : 'Sponsor'}
                </span>
                <div>
                    <Anchor
                        href="https://github.com/zhangzhengyang27/react-ui#赞助"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.becomeBtn}
                        size="sm"
                    >
                        {isCN ? '成为赞助商' : 'Become a sponsor'}
                    </Anchor>
                    <Anchor href={url} target="_blank" rel="noopener noreferrer" className={classes.visitBtn} size="sm">
                        {isCN ? '访问官网 →' : 'Visit website →'}
                    </Anchor>
                </div>
            </div>
        </div>
    )
}

export default SponsorCard
