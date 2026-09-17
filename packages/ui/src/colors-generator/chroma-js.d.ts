// chroma-js 无自带类型声明,仅补充包内实际用到的成员
declare module 'chroma-js' {
    export type Color = {
        get(channel: string): number;
        [key: string]: any;
    };
    function chroma(input?: any): chroma.Color;
    export = chroma;
    export as namespace chroma;
}
