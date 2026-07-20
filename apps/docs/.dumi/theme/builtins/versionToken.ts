export type GlobalTokenSource = 'seed' | 'map' | 'alias';

export interface GlobalTokenMeta {
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  type: string;
  source: GlobalTokenSource;
}

export interface ComponentTokenMeta {
  source: string;
  token: string;
  type: string;
  desc: string;
  descEn: string;
  name: string;
  nameEn: string;
}

export interface VersionTokenMeta {
  global: Record<string, GlobalTokenMeta>;
  components: Record<string, ComponentTokenMeta[]>;
}

export type VersionTokenValue = string | number | boolean;

export interface ComponentTokenStatistic {
  global?: string[];
  component: Record<string, VersionTokenValue>;
}

export type VersionTokenStatistic = Record<string, ComponentTokenStatistic>;

// react-ui 不使用 antd token 体系，这里保留导出仅作占位，
// 下游表格组件（ComponentTokenTable / TokenCompare / TokenTable）会渲染空数据。
export const tokenMeta = {} as VersionTokenMeta;

export const tokenData = {} as VersionTokenStatistic;
