import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getPath } from '../../paths';
import { FormPathValue, LooseKeys } from '../../paths.types';
import { FormFieldSubscriber, Watch } from '../../types';
import { $FormStatus } from '../use-form-status/use-form-status';
import { $FormValues, SetValuesSubscriberPayload } from '../use-form-values/use-form-values';

interface UseFormWatchInput<out Values extends Record<PropertyKey, any>> {
  $values: $FormValues<Values>;
  $status: $FormStatus<Values>;
  cascadeUpdates?: boolean;
}

export interface $FormWatch<Values extends Record<PropertyKey, any>> {
  subscribers: React.RefObject<Record<string, FormFieldSubscriber<Values, any>[]>>;
  watch: Watch<Values, any>;
  getFieldSubscribers: (path: any) => ((input: SetValuesSubscriberPayload<Values>) => void)[];
  notifyWatchSubscribers: (previousValues: Values) => void;
}

export function useFormWatch<
  Values extends Record<PropertyKey, any>,
  Field extends LooseKeys<Values> = LooseKeys<Values>,
>({ $values, $status, cascadeUpdates }: UseFormWatchInput<Values>) {
  const subscribers = useRef<Record<Field, FormFieldSubscriber<Values, Field>[]>>({} as any);

  const watch: Watch<Values, Field> = useCallback((path, callback) => {
    // watch(field, cb) 是在调用方组件的渲染期被调用的，这里靠 useEffect 注册订阅：
    // 一是让订阅跟着调用方组件的卸载/ callback 身份变化清理（demo 里每次都传新的
    // 内联箭头函数，改成命令式 push 就会每渲染泄漏一个订阅者），二是让 hook 顺序由
    // 调用方组件负责。真正干净的做法是另开一个 useWatch(field, cb) 顶层 hook，
    // 那属于 API 面变更，不在本次 lint 收尾里做。
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      subscribers.current[path] = subscribers.current[path] || [];
      subscribers.current[path].push(callback);

      return () => {
        subscribers.current[path] = subscribers.current[path].filter((cb) => cb !== callback);
      };
      // path 必须在依赖里：只写 callback 时，消费方一旦把 callback 用 useCallback 稳定住，
      // 换 watched 字段就不会重新订阅——订阅永远挂在旧 path 上，新字段收不到通知、
      // 旧字段却还在通知。这条 effect 上方压了 rules-of-hooks 豁免，
      // exhaustive-deps 分析不到它，所以只能靠下面的回归测试守住。
    }, [path, callback]);
  }, []);

  const getFieldSubscribers = useCallback((path: Field) => {
    const result: ((input: SetValuesSubscriberPayload<Values>) => void)[] =
      subscribers.current[path]?.map(
        (callback) => (input: SetValuesSubscriberPayload<Values>) =>
          callback({
            previousValue: getPath(path, input.previousValues) as any,
            value: getPath(path, input.updatedValues) as any,
            touched: $status.isTouched(path),
            dirty: $status.isDirty(path),
          })
      ) ?? [];

    for (const subscriptionKey in subscribers.current) {
      const isParent = String(path).startsWith(`${subscriptionKey}.`);
      const isChild = String(subscriptionKey).startsWith(`${path}.`);

      if (isParent || (cascadeUpdates && isChild)) {
        result.push(
          ...subscribers.current[subscriptionKey].map(
            (cb) => (input: SetValuesSubscriberPayload<Values>) =>
              cb({
                previousValue: getPath(subscriptionKey, input.previousValues) as any,
                value: getPath(subscriptionKey, input.updatedValues) as any,
                touched: $status.isTouched(subscriptionKey),
                dirty: $status.isDirty(subscriptionKey),
              })
          )
        );
      }
    }

    return result;
  }, [$status, cascadeUpdates]);

  const notifyWatchSubscribers = useCallback((previousValues: Values) => {
    Object.keys(subscribers.current).forEach((path) => {
      const value = getPath(path, $values.refValues.current);
      const previousValue = getPath(path, previousValues);

      if (value !== previousValue) {
        subscribers.current[path as Field]?.forEach((cb) =>
          cb({
            previousValue: getPath(path, previousValues) as FormPathValue<Values, Field>,
            value: getPath(path, $values.refValues.current) as FormPathValue<Values, Field>,
            touched: $status.isTouched(path),
            dirty: $status.isDirty(path),
          })
        );
      }
    });
  }, [$status, $values.refValues]);

  // 稳定容器：对象身份在组件生命周期内不变，成员每渲染重新赋值（与 onChangeRef 同一套
  // 写法）。此前每渲染 return {} 让下游无法把 $ 系列 store 写进依赖表——写了就等于每渲染
  // 重建回调。getter 的身份仍然按契约随值变化（tests/*/compiler-stability.test.ts），
  // 这里稳定的只是外层容器。
  const store = useMemo(() => ({} as $FormWatch<Values>), []);

  store.subscribers = subscribers;
  store.watch = watch;
  store.getFieldSubscribers = getFieldSubscribers;
  store.notifyWatchSubscribers = notifyWatchSubscribers;

  return store;
}
