import { Box, Button, ButtonProps, Group, GroupProps } from '@xiaoye-react/ui';
import { ConfirmLabels } from './context';
import { useModals } from './use-modals/use-modals';

export interface ConfirmModalProps {
  id?: string;
  children?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  cancelProps?: ButtonProps & React.ComponentProps<'button'> & Record<`data-${string}`, any>;
  confirmProps?: ButtonProps & React.ComponentProps<'button'> & Record<`data-${string}`, any>;
  groupProps?: GroupProps;
  labels?: ConfirmLabels;
}

export function ConfirmModal({
  id,
  cancelProps,
  confirmProps,
  // 默认文案兜底：ModalsProvider 未配 labels 且 openConfirmModal 未传 labels 时，
  // 空字符串会渲染出两个无文字按钮
  labels = { cancel: '取消', confirm: '确认' },
  closeOnConfirm = true,
  closeOnCancel = true,
  groupProps,
  onCancel,
  onConfirm,
  children,
}: ConfirmModalProps) {
  const { cancel: cancelLabel, confirm: confirmLabel } = labels;
  const ctx = useModals();

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    typeof cancelProps?.onClick === 'function' && cancelProps?.onClick(event);
    typeof onCancel === 'function' && onCancel();
    closeOnCancel && ctx.closeModal(id!);
  };

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    typeof confirmProps?.onClick === 'function' && confirmProps?.onClick(event);
    typeof onConfirm === 'function' && onConfirm();
    closeOnConfirm && ctx.closeModal(id!);
  };

  return (
    <>
      {children && <Box mb="md">{children}</Box>}

      <Group mt={children ? 0 : 'md'} justify="flex-end" {...groupProps}>
        <Button variant="default" {...cancelProps} onClick={handleCancel}>
          {cancelProps?.children || cancelLabel}
        </Button>

        <Button {...confirmProps} onClick={handleConfirm}>
          {confirmProps?.children || confirmLabel}
        </Button>
      </Group>
    </>
  );
}
