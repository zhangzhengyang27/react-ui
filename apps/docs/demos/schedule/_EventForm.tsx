import dayjs from 'dayjs';
import { ReactNode, useEffect } from 'react';
import { Button, Group, Modal, ModalProps, Stack, TextInput } from '@react-ui/ui';
import { DateTimePicker, DateValue } from '@react-ui/dates';
import { isNotEmpty, useForm } from '@react-ui/form';

export interface EventData {
  id?: string | number;
  title: string;
  start: DateValue;
  end: DateValue;
  color?: string;
}

interface EventFormProps extends Omit<ModalProps, 'onSubmit'> {
  values: EventData | null;
  onSubmit: (values: EventData) => void;
  onDelete?: () => void;
  children?: ReactNode;
}

export function EventForm({
  opened,
  onClose,
  values,
  onSubmit,
  onDelete,
  children,
  ...others
}: EventFormProps) {
  const form = useForm({
    initialValues: {
      id: values?.id,
      title: values?.title || '',
      start: values?.start || new Date('2024-01-15'),
      end: values?.end || new Date('2024-01-15'),
      color: values?.color || 'blue',
    },
    validate: {
      title: isNotEmpty('Event title is required'),
      start: isNotEmpty('Start time is required'),
      end: (value, { start }) => {
        if (!value) {
          return 'End time is required';
        }

        if (dayjs(value).isBefore(dayjs(start))) {
          return 'End time must be after start time';
        }

        return null;
      },
    },
  });

  useEffect(() => {
    form.setValues({
      id: values?.id,
      title: values?.title || '',
      start: values?.start || new Date('2024-01-15'),
      end: values?.end || new Date('2024-01-15'),
      color: values?.color || 'blue',
    });
  }, [values]);

  const handleSubmit = (values: EventData) => {
    onSubmit({
      id: values.id,
      title: values.title,
      start: values.start,
      end: values.end,
      color: values.color,
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={form.values.id ? '编辑事件' : '创建事件'}
      {...others}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="事件标题"
            placeholder="输入事件标题"
            data-autofocus
            {...form.getInputProps('title')}
          />

          <DateTimePicker label="开始时间" clearable {...form.getInputProps('start')} />
          <DateTimePicker label="结束时间" {...form.getInputProps('end')} clearable />

          {children}

          <Group justify="flex-end" gap="sm">
            {form.values.id && onDelete && (
              <Button color="red" onClick={handleDelete} mie="auto">
                Delete
              </Button>
            )}

            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{form.values.id ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export const _eventFormCode = `import { useEffect } from 'react';
import { Modal, TextInput, Button, Stack, Group, Checkbox } from '@react-ui/ui';
import { DateTimePicker } from '@react-ui/dates';
import { useForm } from '@react-ui/form';

interface EventData {
  id?: string | number;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  isAllDay?: boolean;
}

interface EventFormProps {
  opened: boolean;
  onClose: () => void;
  initialData: EventData | null;
  onSave: (data: EventData) => void;
  onDelete?: () => void;
}

export function EventForm({
  opened,
  onClose,
  values,
  onSubmit,
  onDelete,
  ...others
}: EventFormProps) {
  const form = useForm({
    initialValues: {
      id: values?.id,
      title: values?.title || '',
      start: values?.start || new Date('2024-01-15'),
      end: values?.end || new Date('2024-01-15'),
      color: values?.color || 'blue',
    },
    validate: {
      title: isNotEmpty('Event title is required'),
      start: isNotEmpty('Start time is required'),
      end: (value, { start }) => {
        if (!value) {
          return 'End time is required';
        }

        if (dayjs(value).isBefore(dayjs(start))) {
          return 'End time must be after start time';
        }

        return null;
      },
    },
  });

  useEffect(() => {
    form.setValues({
      id: values?.id,
      title: values?.title || '',
      start: values?.start || new Date('2024-01-15'),
      end: values?.end || new Date('2024-01-15'),
      color: values?.color || 'blue',
    });
  }, [values]);

  const handleSubmit = (values: EventData) => {
    onSubmit({
      id: values.id,
      title: values.title,
      start: values.start,
      end: values.end,
      color: values.color,
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={form.values.id ? '编辑事件' : '创建事件'}
      {...others}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="事件标题"
            placeholder="输入事件标题"
            data-autofocus
            {...form.getInputProps('title')}
          />

          <DateTimePicker
            label="开始时间"
            clearable
            {...form.getInputProps('start')}
          />
          <DateTimePicker label="结束时间" {...form.getInputProps('end')} clearable />

          <Group justify="flex-end" gap="sm">
            {form.values.id && onDelete && (
              <Button color="red" onClick={handleDelete} mie="auto">
                Delete
              </Button>
            )}

            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {form.values.id ? 'Update' : 'Create'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}`;
