module.exports = (api) => {
  const config = {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      "transform-es2015-modules-commonjs",
    ],
  };

  if (api.env("test")) {
    config.plugins.push([
      "effector/babel-plugin",
      {
        factories: ["src/state/utils.ts"],
      },
    ]);
    // config.plugins.push([
    //   'module-resolver',
    //   {
    //     root: ['.'],
    //     alias: {
    //       'effector-react': 'effector-react/scope',
    //     },
    //   },
    // ]);
  }

  return config;
};
