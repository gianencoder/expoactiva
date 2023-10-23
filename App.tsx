import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './src/theme/GlobalTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, StatusBar } from 'react-native';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';
import { MyColors } from './src/theme/ColorsTheme';
import { ThemeProvider } from './src/context/themeContext/ThemeContext';
import { usePushNotifications } from './src/hooks/usePushNotifications';
import LocationDaemon from './src/functions/LocationDaemon';
import { FavoritesProvider } from './src/context/FavouriteContext/FavouritesContext';
import { AuthProvider } from './src/context/AuthContext/AuthContext';

export default function App() {
  LogBox.ignoreLogs(['Sending']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeProvider>
          <NavigationContainer>
            <SafeAreaView style={{ ...styles.container }}>
              <StatusBar
                barStyle={'light-content'}
                backgroundColor={MyColors.primary}
              />
              <BottomTabNavigator />
            </SafeAreaView>
          </NavigationContainer >
          <LocationDaemon />
        </ThemeProvider >
      </FavoritesProvider>
    </AuthProvider>
  );
}