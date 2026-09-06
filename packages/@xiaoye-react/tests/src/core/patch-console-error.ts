const initialError = console.error;
const initialWarn = console.warn;
function patchConsoleError() {
  console.error = () => {
  };
}
patchConsoleError.release = () => {
  console.error = initialError;
};
function patchConsoleWarn() {
  console.warn = () => {
  };
}
patchConsoleWarn.release = () => {
  console.warn = initialWarn;
};

// 历史别名：部分扩展包测试以此名称引入（从未接入 runner 的旧测试文件）
const autoPatchWarn = patchConsoleWarn;
const autoPatchError = patchConsoleError;

export { patchConsoleError, patchConsoleWarn, autoPatchWarn, autoPatchError };
