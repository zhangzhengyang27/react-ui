const inputWrapperQueries = {
  getLabel: (container) => container.querySelector(".ui-InputWrapper-label"),
  getError: (container) => container.querySelector(".ui-InputWrapper-error"),
  getRequired: (container) => container.querySelector(".ui-InputWrapper-required"),
  getDescription: (container) => container.querySelector(".ui-InputWrapper-description")
};

export { inputWrapperQueries };
