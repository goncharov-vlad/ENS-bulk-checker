module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  }
}