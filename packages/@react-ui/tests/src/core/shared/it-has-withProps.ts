function itHasWithProps(options, name = "has static withProps function") {
  it(name, () => {
    expect(typeof options.component.withProps).toBe("function");
  });
}

export { itHasWithProps };
