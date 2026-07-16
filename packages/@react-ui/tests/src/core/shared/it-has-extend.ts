function itHasExtend(options, name = "has static extend function") {
  it(name, () => {
    expect(typeof options.component.extend).toBe("function");
  });
}

export { itHasExtend };
