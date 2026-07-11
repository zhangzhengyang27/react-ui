export const PACKAGES_DATA = [
  {
    package: '@react-ui/hooks',
    description: 'Hooks for state and UI management',
    dependencies: ['@react-ui/hooks'],
  },
  {
    package: '@react-ui/ui',
    description: 'Core components library: inputs, buttons, overlays, etc.',
    dependencies: ['@react-ui/hooks', '@react-ui/ui'],
  },
  {
    package: '@react-ui/ui',
    description: 'Form management library',
    dependencies: ['@react-ui/ui'],
  },
  {
    package: '@react-ui/ui',
    description: 'Date inputs, calendars',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui', 'dayjs'],
  },
  {
    package: '@react-ui/ui',
    description: 'Recharts based charts library',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui', 'recharts'],
  },
  {
    package: '@react-ui/ui',
    description: 'Notifications system',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui'],
  },
  {
    package: '@react-ui/ui',
    description: 'Code highlight with your theme colors and styles',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui'],
  },
  {
    package: '@react-ui/ui',
    description: 'Rich text editor based on Tiptap',
    dependencies: [
      '@react-ui/hooks',
      '@react-ui/ui',
      '@react-ui/ui',
      '@tiptap/pm',
      '@tiptap/react',
      '@tiptap/extension-link',
      '@tiptap/starter-kit',
    ],
  },
  {
    package: '@react-ui/ui',
    description: 'Capture files with drag and drop',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui'],
  },
  {
    package: '@react-ui/ui',
    description: 'Embla based carousel component',
    dependencies: [
      '@react-ui/hooks',
      '@react-ui/ui',
      '@react-ui/ui',
      'embla-carousel@^8.5.2',
      'embla-carousel-react@^8.5.2',
    ],
  },
  {
    package: '@react-ui/ui',
    description: 'Overlay command center',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui'],
  },
  {
    package: '@react-ui/ui',
    description: 'Centralized modals manager',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui'],
  },
  {
    package: '@react-ui/ui',
    description: 'Navigation progress',
    dependencies: ['@react-ui/hooks', '@react-ui/ui', '@react-ui/ui'],
  },
];
