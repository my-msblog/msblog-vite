module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  globals: {
    defineProps: 'readonly',
    withDefaults: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/require-default-prop': 'off',
    'no-var': 'error', // 禁止使用 var
    'no-alert': 0,
    'comma-spacing': 2, // 逗号后空格
    'semi-spacing': [0, { before: false, after: true }], // 分号后空格
    '@typescript-eslint/no-var-requires': 0,
    'array-bracket-spacing': 0, //括号内留空
    'object-curly-spacing': ['error', 'always'],
    'no-multi-spaces': 'error', // 禁止多个空格
    'semi': [2, 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'quotes': ['error', 'single'], // 使用单引号
    'dot-notation':0,
    'import/first':0,
    'key-spacing': [0, { 'beforeColon': false, 'afterColon': true }],
    'vue/singleline-html-element-content-newline':0,
    'vue/singleline-html-element-content-newline':0,
    'vue/html-closing-bracket-spacing': 'error',
    'vue/mustache-interpolation-spacing': 'error',
    'vue/html-indent': 'error',
    'space-before-function-paren':0,
    'no-irregular-whitespace':0,
    'vue/max-attributes-per-line':['error', {
      'singleline': {
        'max': 3,
        'allowFirstLine': true
      },
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/html-self-closing': 1,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
