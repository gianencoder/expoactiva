const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'Expoactiva (dev)' : 'Expoactiva Nacional',
    slug: "expoactiva-nacional-app",
    version: "1.0.1",
    orientation: "portrait",
    icon : "./assets/icon.png",
    splash: {
      image: "./assets/mainIcon.png",
      resizeMode: "contain",
      backgroundColor: "#00624e",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'com.cyb3rsoft.expoactivaapp.dev' : 'com.cyb3rsoft.expoactivaapp',
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ["com.googleusercontent.apps.808320141330-gnmt0lf7aqh6d5kns4hb2b69eerkm9qp"]
          }
        ],
      }
    },
    android: {
      package: IS_DEV ? 'com.cyb3rsoft.expoactivaapp.dev' : 'com.cyb3rsoft.expoactivaapp',
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
      ],
      googleServicesFile: IS_DEV ? "./google-services-dev.json" : "./google-services.json",
    },
    plugins: [
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsImpl: "mapbox",
          RNMapboxMapsDownloadToken: "sk.eyJ1IjoibGF6YXJvYm9yZ2hpIiwiYSI6ImNsbTczaW5jdzNncGgzam85bjdjcDc3ZnQifQ.hhdcu0s0SZ2gm_ZHQZ4h7A",
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Show current location on map.",
        },
      ],
      "@react-native-google-signin/google-signin"
    ],
    runtimeVersion: {
      policy: "sdkVersion",
    },
    scheme: "expoactiva-nacional-app",
    extra: {
      eas: {
        projectId: "d0ec153d-92dc-4975-8499-3e7f0fa38b98",
      },
    },
    userInterfaceStyle: 'automatic', // Configuración para admitir temas claros y oscuros
  },
};
