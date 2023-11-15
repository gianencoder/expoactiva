import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './src/theme/GlobalTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, Platform, StatusBar } from 'react-native';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';
import { MyColors } from './src/theme/ColorsTheme';
import { ThemeProvider } from './src/context/themeContext/ThemeContext';
import LocationDaemon from './src/functions/LocationDaemon';
import { FavoritesProvider } from './src/context/FavouriteContext/FavouritesContext';
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import { PaymentProvider } from './src/context/PaymentContext/PaymentContext';
import { RedeemTicketProvider } from './src/context/RedeemTicketContext/RedeemTicketContext';
import { InitScreen } from './src/screens/InitScreen';
import { useState } from 'react';

export default function App() {

  LogBox.ignoreLogs(['Sending']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreLogs(['bug in React']);
  LogBox.ignoreLogs(['Warning']);
  LogBox.ignoreLogs(['BACK']);
  LogBox.ignoreLogs(['Possible']);
  LogBox.ignoreLogs(['Clipboard']);
  LogBox.ignoreLogs(['No native splash screen registered for given view controller']);
  const [showInitScreen, setShowInitScreen] = useState(true);

  if (showInitScreen) {
    return <InitScreen onAcceptTerms={() => setShowInitScreen(false)} />;
  }

  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeProvider>
          <PaymentProvider>
            <RedeemTicketProvider>
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
            </RedeemTicketProvider>
          </PaymentProvider>
        </ThemeProvider >
      </FavoritesProvider>
    </AuthProvider>
  );
}