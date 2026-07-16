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

export { patchConsoleError, patchConsoleWarn };
