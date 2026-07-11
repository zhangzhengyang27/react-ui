import { Shell } from '../Shell'
import { HomePageCombobox } from './HomePageCombobox/HomePageCombobox'
import { HomePageComponents } from './HomePageComponents/HomePageComponents'
import { HomePageDarkColorScheme } from './HomePageDarkColorScheme/HomePageDarkColorScheme'
import { HomePageHooks } from './HomePageHooks/HomePageHooks'
import { HomePageJumbotron } from './HomePageJumbotron/HomePageJumbotron'
import { HomePageLLM } from './HomePageLLM/HomePageLLM'
import { HomePageSponsors } from './HomePageSponsors/HomePageSponsors'
import { HomePageStyles } from './HomePageStyles/HomePageStyles'
import classes from './HomePage.module.css'

export function HomePage() {
    return (
        <Shell withNavbar={false} fluid withNav={false}>
            <div className={classes.root}>
                <HomePageJumbotron />
                <HomePageSponsors />
                <HomePageLLM />
                <HomePageComponents />
                <HomePageHooks />
                <HomePageStyles />
                <HomePageDarkColorScheme />
                <HomePageCombobox />
            </div>
        </Shell>
    )
}
