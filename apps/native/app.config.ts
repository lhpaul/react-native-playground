import { ConfigContext, ExpoConfig } from 'expo/config';
import { version } from './package.json';

const environment = process.env.ENV ?? 'dev';
const appName = `${environment === 'prod' ? '' : `[${(environment).toUpperCase()}] `}Expo Playground` ;
const appId = `cl.lhpaul.reactNativePlayground${environment === 'prod' ? '' : `.${environment}`}`;

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log('⚙️ Building app for environment:', process.env.ENV);
  return {
    ...config,
    name: appName,
    slug: 'react-native-playground',
    version,
    scheme: appId,
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: false,
    extra: {
      eas: {
        projectId: '789d549a-b741-4221-9f83-02def516dae6' // TODO: add explanation in README
      }
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: appId,
      googleServicesFile: `./environments/${environment}/GoogleService-Info.plist`
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      },
      package: appId,
      googleServicesFile: `./environments/${environment}/google-services.json`
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro'
    },
    plugins: [
      ['@react-native-firebase/app'],
      ['@react-native-firebase/auth'],
      ['expo-build-properties',
        {
          ios: {
            useFrameworks: 'static'
          }
        }
      ],
      [
        'expo-dev-client',
        {
          'launchMode': 'most-recent'
        }
      ],
      'expo-router'
    ]
  };
};