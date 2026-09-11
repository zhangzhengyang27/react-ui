(() => {
  if (!('modelContext' in navigator)) {
    return;
  }
  const mc = navigator.modelContext;

  const controller = new AbortController();

  mc.registerTool(
    {
      name: 'search-react-ui-docs',
      description: 'Search react-ui component documentation and return relevant results.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query for react-ui documentation.',
          },
        },
        required: ['query'],
      },
    },
    (input) => ({
      content: [
        {
          type: 'text',
          text: `Search react-ui docs at: https://react-ui.dev/components/overview. Query: ${input.query}`,
        },
      ],
    }),
    { signal: controller.signal },
  );
})();
