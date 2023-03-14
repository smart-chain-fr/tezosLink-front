module.exports = {
  overrides: [
    {
      files: "src/**/*.ts",
      options: {
        tabWidth: 4,
        useTabs: true,
        singleQuote: false,
        trailingComma: "all",
        printWidth: 240,
        endOfLine: "crlf",
        semi: true,
      },
    },
  ],
};
