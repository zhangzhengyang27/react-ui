export function getInputOnChange<Value>(
  setValue: (value: Value | ((current: Value) => Value)) => void
) {
  return (val: Value | React.ChangeEvent<unknown> | ((current: Value) => Value)) => {
    if (!val) {
      setValue(val as Value);
    } else if (typeof val === 'function') {
      setValue(val);
    } else if (typeof val === 'object' && 'nativeEvent' in val) {
      const { currentTarget } = val;
      if (currentTarget instanceof HTMLInputElement) {
        if (currentTarget.type === 'checkbox') {
          setValue(currentTarget.checked as any);
        } else if (currentTarget.type === 'file') {
          // file 输入的 .value 是 fakepath 字符串，表单值必须是 FileList
          setValue(currentTarget.files as any);
        } else {
          setValue(currentTarget.value as any);
        }
      } else if (
        currentTarget instanceof HTMLTextAreaElement ||
        currentTarget instanceof HTMLSelectElement
      ) {
        setValue(currentTarget.value as any);
      }
    } else {
      setValue(val);
    }
  };
}
