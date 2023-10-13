import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './src/theme/GlobalTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, StatusBar } from 'react-native';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';
import { MyColors } from './src/theme/ColorsTheme';
import { ThemeContext, ThemeProvider } from './src/context/themeContext/ThemeContext';
import { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthScreen } from './src/screens/AuthScreen';
import LocationDaemon from './src/functions/LocationDaemon';
import { FavoritesProvider } from './src/context/FavouriteContext/FavouritesContext';

export default function App() {
  LogBox.ignoreLogs(['Sending']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  return (
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


  );
}