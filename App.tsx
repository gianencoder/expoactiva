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

export default function App() {
  LogBox.ignoreLogs(['Sending']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const { theme } = useContext(ThemeContext)
  return (

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
    </ThemeProvider >
  );
}