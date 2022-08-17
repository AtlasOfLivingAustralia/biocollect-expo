import configBiocollect from './biocollect.config.json';
import 'dotenv/config';

export default {
  expo: {
    name: 'BioCollect',
    slug: 'biocollect',
    scheme: 'biocollect',
    version: '0.0.1',
    owner: 'atlasoflivingaustralia',
    orientation: 'portrait',
    icon: './assets/icon.png',
    platforms: ['ios', 'android'],
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
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
    extra: {
      config: configBiocollect,
      environment: process.env.APP_ENVIRONMENT,
    },
  },
};
