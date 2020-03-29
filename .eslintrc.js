module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // "@typescript-eslint/no-inferrable-types": "off", // 关闭类型推断
    // "prefer-const": process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // "@typescript-eslint/no-empty-function": process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // "@typescript-eslint/consistent-type-assertions": process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // "use-isnan": process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // "no-var": process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // "no-constant-condition": process.env.NODE_ENV === 'production' ? 'off' : 'off',
  }
}
