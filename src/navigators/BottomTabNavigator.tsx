import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { TicketsScreen } from '../screens/TicketsScreen';
import { IconHomeComponent } from '../components/IconHomeComponent';
import { IconUserComponent } from '../components/IconUserComponent';
import { IconMyTicketsComponent } from '../components/IconMyTicketsComponent';
import { View } from 'react-native'
import { HeaderComponent } from '../components/HeaderComponent';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { ConfigurationScreen } from '../screens/ConfigurationScreen';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,

                    tabBarStyle: {
                        backgroundColor: theme.customColors.transparent,
                        // position: 'absolute',
                        borderTopColor: 'transparent'
                    },
                    tabBarHideOnKeyboard: true,
                })}
            >

                <Tab.Screen name='Inicio' component={MyStack} options={{ tabBarIcon: ({ focused }) => (<IconHomeComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? theme.customColors.activeColor : theme.customColors.bottomTabIcon} />) }} />
                <Tab.Screen name='Mis entradas' component={TicketsScreen} options={{ tabBarIcon: ({ focused }) => (<IconMyTicketsComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? theme.customColors.activeColor : theme.customColors.bottomTabIcon} />) }} />
                <Tab.Screen name='Configuracion' component={ConfigurationScreen} options={{ tabBarIcon: ({ focused }) => (<IconUserComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? theme.customColors.activeColor : theme.customColors.bottomTabIcon} />) }} />

            </Tab.Navigator >
        </View>

    );
}