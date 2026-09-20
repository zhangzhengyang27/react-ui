import type { FactoryPayload, TransformVars } from '@xiaoye-react/ui';

/**
 * 空对象占位（等价于 type-fest 的 EmptyObject）。这里自己声明而不是 import：
 * 本包并没有把 type-fest 写进 dependencies，靠 pnpm 提升链到它是偶然的——
 * 一次无关的安装重排 node_modules 就会把它解析到别处的旧版本而整包类型报错。
 */
type EmptyObject = { [K in never]: never };

export interface Modifier<StylesNames extends string> {
  modifier: string;
  selector: StylesNames | StylesNames[];
  condition?: string;
  value?: string;
}

export interface Selectors<Factory extends FactoryPayload> {
  selectors: Factory['stylesNames'] extends string ? Record<Factory['stylesNames'], string> : never;
}

export interface Vars<Factory extends FactoryPayload> {
  vars: TransformVars<Factory>;
}

export interface Modifiers<Factory extends FactoryPayload> {
  modifiers?: Factory['stylesNames'] extends string ? Modifier<Factory['stylesNames']>[] : never;
}

export type StylesApiData<Factory extends FactoryPayload> = (Factory['stylesNames'] extends string
  ? Selectors<Factory>
  : EmptyObject) &
  Vars<Factory['vars']> &
  (Factory['stylesNames'] extends string ? Modifiers<Factory> : EmptyObject);
