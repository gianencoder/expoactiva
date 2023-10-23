import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './src/theme/GlobalTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, StatusBar } from 'react-native';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';
import { MyColors } from './src/theme/ColorsTheme';
import { ThemeProvider } from './src/context/themeContext/ThemeContext';
import LocationDaemon from './src/functions/LocationDaemon';
import { FavoritesProvider } from './src/context/FavouriteContext/FavouritesContext';
import { AuthProvider } from './src/context/AuthContext/AuthContext';

export default function App() {
  LogBox.ignoreLogs(['Sending']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);
<<<<<<< HEAD
=======
  LogBox.ignoreLogs(['bug in React']);
  LogBox.ignoreLogs(['Warning']);
  LogBox.ignoreLogs(['BACK']);
>>>>>>> e97025de5eff2c037b551bc1f9168793b7a40b0a

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