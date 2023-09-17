import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './src/theme/GlobalTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox, StatusBar } from 'react-native';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';
import { MyColors } from './src/theme/ColorsTheme';
import { HeaderComponent } from './src/components/HeaderComponent';

export default function App() {
  LogBox.ignoreLogs(['Sending']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          animated={true}
          translucent={true}
          backgroundColor={MyColors.white}
          showHideTransition={'fade'}
        />
        <HeaderComponent />
        <BottomTabNavigator />
      </SafeAreaView>

    </NavigationContainer >


  );
}


