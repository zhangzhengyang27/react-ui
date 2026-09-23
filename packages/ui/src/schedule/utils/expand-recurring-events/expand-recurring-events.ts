import dayjs from 'dayjs';
// rrule@2.8 有两个入口：main=dist/es5/rrule.js（CJS，纯 Node 走这条）与
// module=dist/esm/index.js（真·具名导出，webpack/vite 走这条）。
// Node 的 cjs-module-lexer 认不出 es5 构建的具名导出，所以直接
// `import { RRule } from 'rrule'` 在 Node ESM 下就是 SyntaxError: Named export
// 'RRule' not found；而打包器解析到 esm 入口时又压根没有 default 导出，写
// `rruleNamespace.default` 会收到 "export 'default' was not found in 'rrule'"。
// 两边都要顾：具名拿得到就用具名，否则退回 default；退回那一步故意写成计算键，
// 免得 webpack 静态查表时报缺 default。
import * as rruleNamespace from 'rrule';

const rruleShapes = rruleNamespace as unknown as Record<string, unknown>;
const rruleModule = (
  'RRule' in rruleShapes ? rruleShapes : rruleShapes['default']
) as typeof import('rrule');

const { RRule, RRuleSet } = rruleModule;

import { DateTimeStringValue, ScheduleEventData, ScheduleRecurrenceData } from '../../types';
import { validateEvent } from '../validate-event/validate-event';

/**
 * 事件时间都是 naive 本地字符串（即运行时时区的墙钟）。
 * rrule 的 tzid 模式要求 dtstart/exdate 以「该时区墙钟的 UTC-naive Date」传入，
 * 返回值为真实时刻（Date）；由于 tzid 就是运行时时区，dayjs(instant).format()
 * 即还原为同一墙钟——夏令时切换后 rrule 按真实时刻迭代，墙钟时间不再漂移
 * （旧实现按 UTC 分量迭代，跨 DST 会漂移 1 小时）
 */
function getLocalTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

function naiveToUTCNaive(value: dayjs.Dayjs): Date {
  return new Date(
    Date.UTC(value.year(), value.month(), value.date(), value.hour(), value.minute(), value.second())
  );
}

interface ExpandRecurringEventsInput {
  events: ScheduleEventData[] | undefined;
  rangeStart: Date | string;
  rangeEnd: Date | string;
  expansionLimit?: number;
}

function getRecurrenceKey(recurringEventId: string | number, recurrenceId: DateTimeStringValue) {
  return `${recurringEventId}::${recurrenceId}`;
}

function overlapsRange(
  eventStart: dayjs.Dayjs,
  eventEnd: dayjs.Dayjs,
  rangeStart: dayjs.Dayjs,
  rangeEnd: dayjs.Dayjs
) {
  return (
    (eventEnd.isAfter(rangeStart) || eventEnd.isSame(rangeStart)) &&
    (eventStart.isBefore(rangeEnd) || eventStart.isSame(rangeEnd))
  );
}

function getExdateValues(recurrence: ScheduleRecurrenceData | undefined) {
  if (!recurrence?.exdate) {
    return [] as dayjs.Dayjs[];
  }

  return recurrence.exdate
    .map((value) => dayjs(value))
    .filter((value) => value.isValid());
}

function getRRuleString(rule: string) {
  const normalized = rule.trim();
  if (!normalized.includes('\n')) {
    return normalized.startsWith('RRULE:') ? normalized.replace(/^RRULE:/, '') : normalized;
  }

  const rruleLine = normalized
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.startsWith('RRULE:'));

  return rruleLine ? rruleLine.replace(/^RRULE:/, '') : normalized;
}

function getOccurrenceStartsInRange(
  event: ScheduleEventData,
  rangeStart: dayjs.Dayjs,
  rangeEnd: dayjs.Dayjs,
  expansionLimit: number,
  durationMs: number
) {
  const dtstart = dayjs(event.recurrence?.dtstart || event.start);
  if (!dtstart.isValid() || !event.recurrence) {
    return [];
  }

  try {
    const options = RRule.parseString(getRRuleString(event.recurrence.rrule));
    // tzid = 运行时时区：naive 事件时间即该时区墙钟；dtstart/exdate 按 rrule tzid
    // 模式要求以 UTC-naive 形态传入，返回值是真实时刻，跨 DST 墙钟不再漂移
    const rule = new RRule({
      ...options,
      dtstart: naiveToUTCNaive(dtstart),
      tzid: getLocalTimeZone(),
    });

    // exdate 走 RRuleSet（与规则同一 tzid 语义），字符串集合兜底比对
    const set = new RRuleSet();
    set.rrule(rule);
    for (const ex of getExdateValues(event.recurrence)) {
      set.exdate(naiveToUTCNaive(ex));
    }

    // between 的边界必须与候选值同编码:tzid=运行时时区时 rezone 是恒等映射,
    // 候选值保持「墙钟分量编码为 UTC」的形态(iterresult 直接比大小,不再经时区换算);
    // 若传真实本地时刻,窗口会整体偏移 |UTC offset|——东八区丢末日 16:00 之后的实例、
    // 西五区丢首日 05:00 之前的实例(overlapsRange 复滤只能删多、救不回少)
    const searchStart = naiveToUTCNaive(
      rangeStart.subtract(Math.max(0, durationMs), 'millisecond')
    );
    const results = set.between(searchStart, naiveToUTCNaive(rangeEnd), true);
    // rrule 的 tzid 模式在 tzid=运行时时区时 rezone 是恒等映射：
    // 返回值是「墙钟分量编码为 UTC 的时刻」，必须读 UTC 分量还原墙钟串，
    // 再交给 dayjs 按本地解析（本地 == tzid，墙钟一致）；
    // 用 dayjs(instant) 按 local 格式化会把时区偏移重复加回去
    return results
      .slice(0, expansionLimit)
      .map((value) => dayjs(`${value.toISOString().slice(0, 19).replace('T', ' ')}`));
  } catch {
    return [];
  }
}

function isEventInRange(event: ScheduleEventData, rangeStart: dayjs.Dayjs, rangeEnd: dayjs.Dayjs) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);

  if (!start.isValid() || !end.isValid()) {
    return false;
  }

  return overlapsRange(start, end, rangeStart, rangeEnd);
}

function createGeneratedInstance(
  event: ScheduleEventData,
  occurrenceStart: dayjs.Dayjs,
  durationMs: number
): ScheduleEventData {
  const occurrenceEnd = occurrenceStart.add(durationMs, 'millisecond');
  const recurrenceId = occurrenceStart.format('YYYY-MM-DD HH:mm:ss');
  const { recurrence, ...eventWithoutRecurrence } = event;

  return {
    ...eventWithoutRecurrence,
    id: `${event.id}::${recurrenceId}`,
    start: occurrenceStart.format('YYYY-MM-DD HH:mm:ss'),
    end: occurrenceEnd.format('YYYY-MM-DD HH:mm:ss'),
    recurringEventId: event.id,
    recurrenceId,
    recurringInstance: {
      isRecurringInstance: true,
      recurringEventId: event.id,
      recurrenceId,
      originalStart: occurrenceStart.format('YYYY-MM-DD HH:mm:ss'),
      originalEnd: occurrenceEnd.format('YYYY-MM-DD HH:mm:ss'),
    },
  };
}

const DEFAULT_EXPANSION_LIMIT = 2000;

export function expandRecurringEvents({
  events,
  rangeStart,
  rangeEnd,
  expansionLimit = DEFAULT_EXPANSION_LIMIT,
}: ExpandRecurringEventsInput): ScheduleEventData[] {
  if (!events || events.length === 0) {
    return [];
  }

  const start = dayjs(rangeStart);
  const end = dayjs(rangeEnd);

  if (!start.isValid() || !end.isValid()) {
    return [];
  }

  const regularEvents: ScheduleEventData[] = [];
  const recurringEvents: ScheduleEventData[] = [];
  const overrides = new Map<string, ScheduleEventData>();

  for (const event of events) {
    if (event.recurringEventId && event.recurrenceId) {
      overrides.set(getRecurrenceKey(event.recurringEventId, event.recurrenceId), event);
      continue;
    }

    if (event.recurrence?.rrule) {
      recurringEvents.push(event);
      continue;
    }

    regularEvents.push(event);
  }

  const output: ScheduleEventData[] = [];
  const consumedOverrideIds = new Set<string | number>();

  for (const event of regularEvents) {
    if (isEventInRange(event, start, end)) {
      output.push(validateEvent(event));
    }
  }

  for (const event of recurringEvents) {
    const eventStart = dayjs(event.recurrence?.dtstart || event.start);
    const eventEnd = dayjs(event.end);

    if (!eventStart.isValid() || !eventEnd.isValid()) {
      continue;
    }

    const durationMs = eventEnd.diff(dayjs(event.start), 'millisecond');
    if (durationMs < 0) {
      continue;
    }

    // RRuleSet 已按 tzid 语义排除 exdate；这里保留字符串集合兜底，
    // 防御 exdate 与实例的秒级表示不一致（如 '09:00' vs '09:00:00'）
    const exdate = new Set(
      getExdateValues(event.recurrence).map((value) => value.format('YYYY-MM-DD HH:mm:ss'))
    );
    const starts = getOccurrenceStartsInRange(event, start, end, expansionLimit, durationMs);

    for (const occurrenceStart of starts) {
      const recurrenceId = occurrenceStart.format('YYYY-MM-DD HH:mm:ss');
      if (exdate.has(recurrenceId)) {
        continue;
      }

      const overrideKey = getRecurrenceKey(event.id, recurrenceId);
      const override = overrides.get(overrideKey);
      if (override) {
        if (isEventInRange(override, start, end)) {
          output.push(validateEvent(override));
          consumedOverrideIds.add(override.id);
        }
        continue;
      }

      const generated = createGeneratedInstance(event, occurrenceStart, durationMs);
      if (overlapsRange(dayjs(generated.start), dayjs(generated.end), start, end)) {
        output.push(validateEvent(generated));
      }
    }
  }

  for (const override of overrides.values()) {
    if (consumedOverrideIds.has(override.id)) {
      continue;
    }
    if (isEventInRange(override, start, end)) {
      output.push(validateEvent(override));
    }
  }

  return output;
}

export { DEFAULT_EXPANSION_LIMIT };
