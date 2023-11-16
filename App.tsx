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
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainScreen } from './src/screens/MainScreen';
import { CarLocationProvider } from './src/context/CarLocationContext/CarLocationContext';

export default function App() {

  LogBox.ignoreLogs(['Sending']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreLogs(['bug in React']);
  LogBox.ignoreLogs(['Warning']);
  LogBox.ignoreLogs(['BACK']);
  LogBox.ignoreLogs(['Possible']);
  LogBox.ignoreLogs(['Clipboard']);
  LogBox.ignoreLogs(['Mapbox']);
  LogBox.ignoreLogs(['No native splash screen registered for given view controller']);
  LogBox.ignoreLogs(['LOCATION_FOREGROUND']);

  const [showInitScreen, setShowInitScreen] = useState(true);
  const [splashScreen, setSplashScreen] = useState(true)

  useEffect(() => {

    // AsyncStorage.setItem('termsAccepted', 'false');
    AsyncStorage.getItem('termsAccepted').then((value) => {
      setSplashScreen(false)
      if (value === 'true') {
        setShowInitScreen(false);
      }
    });
  }, []);



  const handleAcceptTerms = () => {
    // Guardar el estado en AsyncStorage
    AsyncStorage.setItem('termsAccepted', 'true');
    setShowInitScreen(false);
  };

  if (splashScreen) {
    return <MainScreen />
  }

  if (showInitScreen) {
    return <InitScreen onAcceptTerms={handleAcceptTerms} />;
  }

  return (
    <AuthProvider>
      <CarLocationProvider>
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
      </CarLocationProvider>
    </AuthProvider>
  );
}