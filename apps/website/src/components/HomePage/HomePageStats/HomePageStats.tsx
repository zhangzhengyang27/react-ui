import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import classes from './HomePageStats.module.css';

const stats = [
  { value: '120+', label: '可定制组件' },
  { value: '70+', label: 'React Hooks' },
  { value: '30+', label: '扩展模块' },
  { value: '0', label: '运行时依赖' },
];

export function HomePageStats() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
        <div className={classes.eyebrow}>02 — 规模</div>
        <div className={classes.grid}>
          {stats.map((item) => (
            <div className={classes.item} key={item.label}>
              <div className={classes.value}>{item.value}</div>
              <div className={classes.label}>{item.label}</div>
            </div>
          ))}
        </div>
      </HomePageContainer>
    </section>
  );
}
