import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { styles } from './src/theme/GlobalTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from './src/components/HeaderComponent';
import { StatusBar } from 'react-native';
import { MyColors } from './src/theme/ColorsTheme';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer >
      <SafeAreaView style={styles.container} >
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={MyColors.primary}
        />
        <HeaderComponent />
        <BottomTabNavigator />
      </SafeAreaView>
    </NavigationContainer>

  );
}


