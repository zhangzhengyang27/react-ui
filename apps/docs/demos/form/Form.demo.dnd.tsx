import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { Button, Center, Group, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { randomId } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Group, TextInput, Button, Center } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { randomId } from '@react-ui/hooks';
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, index, form }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Group ref={setNodeRef} mt="xs" style={style} {...attributes}>
      <Center {...listeners}>
        <DotsSixVerticalIcon size={18} />
      </Center>
      <TextInput
        placeholder="张三"
        key={form.key(\`employees.\${index}.name\`)}
        {...form.getInputProps(\`employees.\${index}.name\`)}
      />
      <TextInput
        placeholder="yourname@example.com"
        key={form.key(\`employees.\${index}.email\`)}
        {...form.getInputProps(\`employees.\${index}.email\`)}
      />
    </Group>
  );
}

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [
        { name: 'John Doe', email: 'john@ui.dev', key: 'employee-1' },
        { name: 'Bill Love', email: 'bill@ui.dev', key: 'employee-2' },
        { name: 'Nancy Eagle', email: 'nanacy@ui.dev', key: 'employee-3' },
        { name: 'Lim Notch', email: 'lim@ui.dev', key: 'employee-4' },
        { name: 'Susan Seven', email: 'susan@ui.dev', key: 'employee-5' },
      ],
    },
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const items = form.getValues().employees.map((item) => item.key);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const employees = form.getValues().employees;
      const oldIndex = employees.findIndex((e) => e.key === active.id);
      const newIndex = employees.findIndex((e) => e.key === over.id);
      form.setFieldValue(
        'employees',
        arrayMove(employees, oldIndex, newIndex)
      );
    }
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id, index) => (
            <SortableItem key={id} id={id} index={index} form={form} />
          ))}
        </SortableContext>
      </DndContext>
      <Group justify="center" mt="md">
        <Button onClick={() => form.insertListItem('employees', { name: '', email: '', key: randomId() })}>
          Add employee
        </Button>
      </Group>
    </div>
  );
}
`;

function SortableItem({ id, index, form }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <Group ref={setNodeRef} mt="xs" style={style} {...attributes}>
      <Center {...listeners}>
        <DotsSixVerticalIcon size={18} />
      </Center>
      <TextInput
        placeholder="张三"
        key={form.key(`employees.${index}.name`)}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <TextInput
        placeholder="yourname@example.com"
        key={form.key(`employees.${index}.email`)}
        {...form.getInputProps(`employees.${index}.email`)}
      />
    </Group>
  );
}

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [
        { name: 'John Doe', email: 'john@ui.dev', key: 'employee-1' },
        { name: 'Bill Love', email: 'bill@ui.dev', key: 'employee-2' },
        { name: 'Nancy Eagle', email: 'nanacy@ui.dev', key: 'employee-3' },
        { name: 'Lim Notch', email: 'lim@ui.dev', key: 'employee-4' },
        { name: 'Susan Seven', email: 'susan@ui.dev', key: 'employee-5' },
      ],
    },
  });

  const sensors = useSensors(useSensor(PointerSensor));
  const items = form.getValues().employees.map((item) => item.key);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const employees = form.getValues().employees;
      const oldIndex = employees.findIndex((e) => e.key === active.id);
      const newIndex = employees.findIndex((e) => e.key === over.id);
      form.setFieldValue('employees', arrayMove(employees, oldIndex, newIndex));
    }
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id, index) => (
            <SortableItem key={id} id={id} index={index} form={form} />
          ))}
        </SortableContext>
      </DndContext>
      <Group justify="center" mt="md">
        <Button
          onClick={() => form.insertListItem('employees', { name: '', email: '', key: randomId() })}
        >
          Add employee
        </Button>
      </Group>
    </div>
  );
}

export const dnd: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 440,
};
