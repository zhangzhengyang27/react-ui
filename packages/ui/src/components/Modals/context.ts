import { createContext, ReactNode } from 'react';
import { ModalProps } from '../Modal/index';
import type { ConfirmModalProps } from './ConfirmModal';

export type ModalSettings = Partial<Omit<ModalProps, 'opened'>> & { modalId?: string };

export type ConfirmLabels = Record<'confirm' | 'cancel', ReactNode>;

export interface OpenConfirmModal extends ModalSettings, ConfirmModalProps {}
export interface OpenContextModal<
  CustomProps extends Record<string, any> = {},
> extends ModalSettings {
  innerProps: CustomProps;
}

export interface ContextModalProps<T extends Record<string, any> = {}> {
  context: ModalsContextProps;
  innerProps: T;
  id: string;
}

export type ModalState =
  | { id: string; props: ModalSettings; type: 'content' }
  | { id: string; props: OpenConfirmModal; type: 'confirm' }
  | { id: string; props: OpenContextModal; type: 'context'; ctx: string };

export interface ModalsContextProps {
  modalProps: ModalSettings;
  modals: ModalState[];
  openModal: (props: ModalSettings) => string;
  openConfirmModal: (props: OpenConfirmModal) => string;
  openContextModal: <TKey extends UIModal>(
    modal: TKey,
    props: OpenContextModal<Parameters<UIModals[TKey]>[0]['innerProps']>
  ) => string;
  closeModal: (id: string, canceled?: boolean) => void;
  closeContextModal: <TKey extends UIModal>(id: TKey, canceled?: boolean) => void;
  closeAll: () => void;
  updateModal: (payload: { modalId: string } & Partial<OpenConfirmModal>) => void;
  updateContextModal: (payload: { modalId: string } & Partial<OpenContextModal<any>>) => void;
}

export interface UIModalsOverride {}

export type UIModalsOverwritten = UIModalsOverride extends {
  modals: Record<string, React.FC<ContextModalProps<any>>>;
}
  ? UIModalsOverride
  : {
      modals: Record<string, React.FC<ContextModalProps<any>>>;
    };

export type UIModals = UIModalsOverwritten['modals'];

export type UIModal = keyof UIModals;

export const ModalsContext = createContext<ModalsContextProps>(null as any);
ModalsContext.displayName = '@xiaoye-react/ui/ModalsContext';
