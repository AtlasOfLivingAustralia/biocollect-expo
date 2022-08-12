import biocollectConfig from './biocollect.config.json';

export default {
  name: 'BioCollect',
  slug: 'biocollect',
  scheme: 'biocollect',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  expo: {
    owner: 'atlasoflivingaustralia',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    ...biocollectConfig,
    test: process.env,
    anotherProperty: 'testing123',
  },
};