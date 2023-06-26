import 'react-native-gesture-handler';
import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { MyStack } from './src/navigators/StackNavigator';
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
          showHideTransition={'fade'}
        />
        <HeaderComponent />
        <BottomTabNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}