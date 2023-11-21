import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';
import { MyColors } from './src/theme/ColorsTheme';
import { ThemeContext } from './src/context/themeContext/ThemeContext';

export default function Main() {

    const { theme } = React.useContext(ThemeContext);

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.currentTheme === 'light' ? MyColors.primary : '#1b1b1b'}}>
            <StatusBar
            barStyle={'light-content'}
            backgroundColor={theme.currentTheme === 'light' ? MyColors.primary : '#1b1b1b'}
            />
            <BottomTabNavigator />
        </SafeAreaProvider>
    )

}