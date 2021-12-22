/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            navigators: './src/navigators',
            hooks: './src/hooks',
            images: './src/images',
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
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
