export interface SvgLoaderProps extends React.ComponentProps<any> {}

export type UILoaderComponent = React.FC<React.HTMLAttributes<any> & React.RefAttributes<any>>

export type UILoadersRecord = Partial<Record<'bars' | 'dots' | 'oval' | (string & {}), UILoaderComponent>>
export type UILoader = keyof UILoadersRecord
