module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'babel-plugin-module-resolver'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            // stores: './src/stores',
            // utils: './src/utils',
            // services: './src/services',
            // assets: './assets',
            // constants: './src/constants',
          },
          extensions: [
            'ios.js',
            'android.js',
            'ios.tsx',
            'android.tsx',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
        },
      ],
    ],
  };
};
