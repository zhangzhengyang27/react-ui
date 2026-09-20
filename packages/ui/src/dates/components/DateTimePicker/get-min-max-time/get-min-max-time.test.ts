import { getMaxTime, getMinTime } from './get-min-max-time';

describe('@xiaoye-react/ui/get-min-max-time', () => {
  describe('getMinTime', () => {
    it('returns correct min time when value is on the same date as minDate', () => {
      const minDate = '2022-04-11 00:30:00';
      const value = '2022-04-11 00:30:00';

      expect(getMinTime({ minDate, value })).toBe('00:30:00');
    });

    // 同一天不同时间也应约束（约束按天判定，而非整串相等）
    it('returns min time when value is on the same date but different time', () => {
      const minDate = '2022-04-11 00:30:00';
      const value = '2022-04-11 00:00:00';

      expect(getMinTime({ minDate, value })).toBe('00:30:00');
    });

    it('returns undefined when value is on a different date than minDate', () => {
      const minDate = '2022-04-11 00:30:00';
      const value = '2022-04-12 00:00:00';

      expect(getMinTime({ minDate, value })).toBe(undefined);
    });

    it('returns undefined when minDate is undefined', () => {
      const value = '2022-04-11 00:00:00';

      expect(getMinTime({ minDate: undefined, value })).toBe(undefined);
    });

    it('returns undefined when value is null', () => {
      const minDate = '2022-04-11 00:30:00';

      expect(getMinTime({ minDate, value: null })).toBe(undefined);
    });
  });

  describe('getMaxTime', () => {
    it('returns correct max time when value is on the same date as maxDate', () => {
      const maxDate = '2022-04-11 22:30:00';
      const value = '2022-04-11 22:30:00';

      expect(getMaxTime({ maxDate, value })).toBe('22:30:00');
    });

    // 同一天不同时间也应约束（约束按天判定，而非整串相等）
    it('returns max time when value is on the same date but different time', () => {
      const maxDate = '2022-04-11 22:30:00';
      const value = '2022-04-11 23:00:00';

      expect(getMaxTime({ maxDate, value })).toBe('22:30:00');
    });

    it('returns undefined when value is on a different date than maxDate', () => {
      const maxDate = '2022-04-11 22:30:00';
      const value = '2022-04-12 22:00:00';

      expect(getMaxTime({ maxDate, value })).toBe(undefined);
    });

    it('returns undefined when maxDate is undefined', () => {
      const value = '2022-04-11 22:00:00';

      expect(getMaxTime({ maxDate: undefined, value })).toBe(undefined);
    });

    it('returns undefined when value is null', () => {
      const maxDate = '2022-04-11 22:30:00';

      expect(getMaxTime({ maxDate, value: null })).toBe(undefined);
    });
  });
});
