import { HomePageContainer } from '../shared/Container';
import classes from './Stats.module.css';

const stats = [
  { value: '128+', label: '可定制组件' },
  { value: '83+', label: 'React Hooks' },
  { value: '23', label: '扩展模块' },
  { value: '0', label: '运行时依赖' },
];

export function Stats() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
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
