import { Frontmatter } from '@/types';

export const MDX_FORM_DATA: Record<string, Frontmatter> = {
  FormPackage: {
    title: '开始使用',
    slug: '/form/package',
    hideInSearch: true,
    hideHeader: true,
  },

  useForm: {
    title: 'use-form',
    package: '@react-ui/ui',
    slug: '/form/use-form',
    description: '管理表单状态',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'form/use-form.mdx',
    searchTags: 'form state, form hook, form management, ui form, form library',
  },

  createFormContext: {
    title: '表单上下文',
    package: '@react-ui/ui',
    slug: '/form/create-form-context',
    description: '使用 createFormContext 为 use-form 添加上下文支持',
    docs: 'form/use-form.mdx',
  },

  formErrors: {
    title: '表单错误',
    package: '@react-ui/ui',
    slug: '/form/errors',
    description: '使用 use-form 钩子操作表单错误',
    docs: 'form/errors.mdx',
  },

  formNested: {
    title: '嵌套字段',
    package: '@react-ui/ui',
    slug: '/form/nested',
    description: '使用 use-form 钩子管理嵌套数组和对象状态',
    docs: 'form/nested.mdx',
  },

  formRecipes: {
    title: '示例',
    package: '@react-ui/ui',
    slug: '/form/recipes',
    description: 'use-form 示例',
    docs: 'form/recipes.mdx',
  },

  formStatus: {
    title: '表单状态',
    package: '@react-ui/ui',
    slug: '/form/status',
    description: '获取字段及表单的 touched、dirty 和 submitting 状态',
    docs: 'form/status.mdx',
  },

  formValidation: {
    title: '表单验证',
    package: '@react-ui/ui',
    slug: '/form/validation',
    description: '使用 use-form 钩子验证字段',
    docs: 'form/validation.mdx',
  },

  formSchemaValidation: {
    title: '表单结构验证',
    package: '@react-ui/ui',
    slug: '/form/schema-validation',
    description: '基于 use-form 的结构验证，支持 zod、yup、joi 和 superstruct',
    docs: 'form/schema-validation.mdx',
  },

  formValidators: {
    title: '表单验证器',
    package: '@react-ui/ui',
    slug: '/form/validators',
    description: '预制的验证函数',
    docs: 'form/validators.mdx',
  },

  formValues: {
    title: '表单值',
    package: '@react-ui/ui',
    slug: '/form/values',
    description: '使用 use-form 操作表单值',
    docs: 'form/values.mdx',
  },

  formActions: {
    title: '表单操作',
    package: '@react-ui/ui',
    slug: '/form/actions',
    description: '从应用任意位置更改表单状态',
    docs: 'form/actions.mdx',
  },

  formGetInputProps: {
    title: 'getInputProps',
    package: '@react-ui/ui',
    slug: '/form/get-input-props',
    description: '获取表单中任意字段输入属性的处理器',
    docs: 'form/get-input-props.mdx',
  },

  formUncontrolled: {
    title: '非受控模式',
    package: '@react-ui/ui',
    slug: '/form/uncontrolled',
    description: 'use-form 非受控模式以提升性能',
    docs: 'form/uncontrolled.mdx',
  },

  useField: {
    title: 'use-field',
    package: '@react-ui/ui',
    slug: '/form/use-field',
    description: 'use-field 钩子——管理单个字段状态',
    docs: 'form/use-field.mdx',
  },
  formAllInputs: {
    title: 'use-form 配合所有输入',
    package: '@react-ui/ui',
    slug: '/form/all-inputs',
    description: 'use-form 配合所有 ReactUI 输入使用',
    docs: 'form/all-inputs.mdx',
  },
};
