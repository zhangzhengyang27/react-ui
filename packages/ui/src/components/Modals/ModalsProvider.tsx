import { useCallback, useMemo, useReducer, useRef } from 'react';
import { getDefaultZIndex } from '../../core/utils/index';
import { Modal } from '../Modal/index';
import { randomId } from '@xiaoye-react/hooks';
import { ConfirmModal } from './ConfirmModal';
import {
  ConfirmLabels,
  ContextModalProps,
  ModalsContext,
  ModalsContextProps,
  ModalSettings,
  OpenConfirmModal,
  OpenContextModal,
} from './context';
import { useModalsEvents } from './events';
import { handleCloseModal, modalsReducer } from './reducer';

export interface ModalsProviderProps {
  /** Your app */
  children?: React.ReactNode;

  /** Predefined modals */
  modals?: Record<string, React.FC<ContextModalProps<any>>>;

  /** Shared Modal component props, applied for every modal */
  modalProps?: ModalSettings;

  /** Confirm modal labels */
  labels?: ConfirmLabels;
}

function separateConfirmModalProps(props: OpenConfirmModal) {
  if (!props) {
    return { confirmProps: {}, modalProps: {} };
  }

  const {
    id,
    children,
    onCancel,
    onConfirm,
    closeOnConfirm,
    closeOnCancel,
    cancelProps,
    confirmProps,
    groupProps,
    labels,
    ...others
  } = props;

  return {
    confirmProps: {
      id,
      children,
      onCancel,
      onConfirm,
      closeOnConfirm,
      closeOnCancel,
      cancelProps,
      confirmProps,
      groupProps,
      labels,
    },
    modalProps: {
      id,
      ...others,
    },
  };
}

export function ModalsProvider({ children, modalProps, labels, modals }: ModalsProviderProps) {
  const [state, dispatch] = useReducer(modalsReducer, { modals: [], current: null });
  const stateRef = useRef(state);
  stateRef.current = state;
  const closingRef = useRef(false);

  const closeAll = useCallback(
    (canceled?: boolean) => {
      if (!closingRef.current) {
        closingRef.current = true;
        stateRef.current.modals
          .concat()
          .reverse()
          .forEach((modal) => {
            handleCloseModal(modal, canceled);
          });
        closingRef.current = false;
      }
      dispatch({ type: 'CLOSE_ALL', canceled });
    },
    [stateRef, dispatch]
  );

  const openModal = useCallback(
    ({ modalId, ...props }: ModalSettings) => {
      const id = modalId || randomId();

      dispatch({
        type: 'OPEN',
        modal: {
          id,
          type: 'content',
          props,
        },
      });
      return id;
    },
    [dispatch]
  );

  const openConfirmModal = useCallback(
    ({ modalId, ...props }: OpenConfirmModal) => {
      const id = modalId || randomId();
      dispatch({
        type: 'OPEN',
        modal: {
          id,
          type: 'confirm',
          props,
        },
      });
      return id;
    },
    [dispatch]
  );

  const openContextModal = useCallback(
    (modal: string, { modalId, ...props }: OpenContextModal) => {
      const id = modalId || randomId();
      dispatch({
        type: 'OPEN',
        modal: {
          id,
          type: 'context',
          props,
          ctx: modal,
        },
      });
      return id;
    },
    [dispatch]
  );

  const closeModal = useCallback(
    (id: string, canceled?: boolean) => {
      if (!closingRef.current) {
        const modal = stateRef.current.modals.find((m) => m.id === id);
        if (modal) {
          closingRef.current = true;
          handleCloseModal(modal, canceled);
          closingRef.current = false;
        }
      }
      dispatch({ type: 'CLOSE', modalId: id, canceled });
    },
    [stateRef, dispatch]
  );

  const updateModal = useCallback(
    ({ modalId, ...newProps }: Partial<ModalSettings> & { modalId: string }) => {
      dispatch({
        type: 'UPDATE',
        modalId,
        newProps,
      });
    },
    [dispatch]
  );

  const updateContextModal = useCallback(
    ({ modalId, ...newProps }: { modalId: string } & Partial<OpenContextModal<any>>) => {
      dispatch({ type: 'UPDATE', modalId, newProps });
    },
    [dispatch]
  );

  // 事件对象 memo 化：内联字面量每渲染都是新引用，会让 createUseExternalEvents
  // 内部 useMemo 失效、每渲染重挂全部 window 监听
  const modalsEvents = useMemo(
    () => ({
      openModal,
      openConfirmModal,
      openContextModal: ({ modal, ...payload }: any) => openContextModal(modal, payload),
      closeModal,
      closeContextModal: closeModal,
      closeAllModals: closeAll,
      updateModal,
      updateContextModal,
    }),
    [openModal, openConfirmModal, openContextModal, closeModal, closeAll, updateModal, updateContextModal]
  );

  useModalsEvents(modalsEvents);

  const ctx: ModalsContextProps = {
    modalProps: modalProps || {},
    modals: state.modals,
    openModal,
    openConfirmModal,
    openContextModal,
    closeModal,
    closeContextModal: closeModal,
    closeAll,
    updateModal,
    updateContextModal,
  };

  const getCurrentModal = () => {
    const currentModal = stateRef.current.current;
    switch (currentModal?.type) {
      case 'context': {
        const { innerProps, ...rest } = currentModal.props;
        const ContextModal = modals?.[currentModal.ctx];

        if (!ContextModal) {
          // 友好报错替代 "Element type is invalid"：指明缺少哪个注册的 context modal
          throw new Error(
            `[@xiaoye-react/ui] Context modal "${currentModal.ctx}" was not registered. Pass it to <ModalsProvider modals={{ ... }}>`
          );
        }

        return {
          modalProps: rest,
          content: <ContextModal innerProps={innerProps} context={ctx} id={currentModal.id} />,
        };
      }
      case 'confirm': {
        const { modalProps: separatedModalProps, confirmProps: separatedConfirmProps } =
          separateConfirmModalProps(currentModal.props);

        return {
          modalProps: separatedModalProps,
          content: (
            <ConfirmModal
              {...separatedConfirmProps}
              id={currentModal.id}
              labels={currentModal.props.labels || labels}
            />
          ),
        };
      }
      case 'content': {
        const { children: currentModalChildren, ...rest } = currentModal.props;

        return {
          modalProps: rest,
          content: currentModalChildren,
        };
      }
      default: {
        return {
          modalProps: {},
          content: null,
        };
      }
    }
  };

  const { modalProps: currentModalProps, content } = getCurrentModal();

  return (
    <ModalsContext value={ctx}>
      <Modal
        zIndex={getDefaultZIndex('modal') + 1}
        {...modalProps}
        {...currentModalProps}
        opened={state.modals.length > 0}
        onClose={() => closeModal(state.current?.id as any)}
      >
        {content}
      </Modal>

      {children}
    </ModalsContext>
  );
}
