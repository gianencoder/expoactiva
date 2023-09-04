import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { styles } from './src/theme/GlobalTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from './src/components/HeaderComponent';
import { StatusBar, useColorScheme } from 'react-native';
import { MyColors } from './src/theme/ColorsTheme';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  }

  return (
    <NavigationContainer >
      <SafeAreaView style={styles.container} >
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
        <HeaderComponent />
        <BottomTabNavigator />
      </SafeAreaView>
    </NavigationContainer>

  );
}


