function itHasClasses(options, name = "has static classes") {
  it(name, () => {
    const { classes } = options.component;
    expect(typeof classes === "object" && classes !== null && !Array.isArray(classes)).toBe(true);
  });
}

export { itHasClasses };
