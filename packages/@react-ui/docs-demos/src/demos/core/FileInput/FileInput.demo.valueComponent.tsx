import { FileInput, FileInputProps, Pill } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FileInput, FileInputProps, Pill } from '@react-ui/ui';

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

function Demo() {
  return (
    <FileInput
      label="上传文件"
      placeholder="上传文件"
      multiple
      valueComponent={ValueComponent}
    />
  );
}
`;

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

function Demo() {
  return (
    <FileInput
      label="上传文件"
      placeholder="上传文件"
      multiple
      valueComponent={ValueComponent}
    />
  );
}

export const valueComponent: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
