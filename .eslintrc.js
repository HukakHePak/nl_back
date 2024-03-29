module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "no-console": "warn",
    "no-underscore-dangle": "warn",
    "no-unused-vars": "warn"
  }
}
