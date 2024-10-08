import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { IconHomeComponent } from '../components/IconHomeComponent';
import { IconUserComponent } from '../components/IconUserComponent';
import { IconMyTicketsComponent } from '../components/IconMyTicketsComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HeaderComponent } from '../components/HeaderComponent';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { ConfigurationNavigator } from './ConfigurationNavigator';
import { TicketsNavigator } from './TicketsNavigator';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <HeaderComponent />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: theme.customColors.transparent,
                        borderTopColor: 'transparent',
                    },
                    tabBarHideOnKeyboard: true,
                })}
            >
                <Tab.Screen name='Inicio' component={MyStack} options={{ tabBarIcon: ({ focused }) => (<IconHomeComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? theme.customColors.activeColor : theme.customColors.bottomTabIcon} />) }} />
                <Tab.Screen name='Mis entradas' component={TicketsNavigator} options={{ tabBarIcon: ({ focused }) => (<IconMyTicketsComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? theme.customColors.activeColor : theme.customColors.bottomTabIcon} />) }} />
                <Tab.Screen name='Configuracion' component={ConfigurationNavigator} options={{ tabBarIcon: ({ focused }) => (<IconUserComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? theme.customColors.activeColor : theme.customColors.bottomTabIcon} />) }} />
            </Tab.Navigator >
        </GestureHandlerRootView>

    );
}