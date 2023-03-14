module.exports = {
  overrides: [
    {
      files: ["src//*.ts", "src//.tsx", "src/**/.scss", "./*.js"],
      options: {
        tabWidth: 4,
        useTabs: true,
        singleQuote: false,
        trailingComma: "all",
        printWidth: 140,
        endOfLine: "crlf",
        semi: true,
        bracketSameLine: true,
      },
    },
  ],
};
