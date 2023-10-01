import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { EventScreen } from '../screens/EventScreen';
import { FavouriteEventScreen } from '../screens/FavouriteEventScreen';
import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext/ThemeContext';


const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: theme.colors.text,
                tabBarActiveTintColor: theme.customColors.activeColor,
                tabBarIndicatorStyle: {
                    backgroundColor: theme.customColors.activeColor
                },
                tabBarStyle: { backgroundColor: theme.colors.background }

            }}
        >
            <Tab.Screen name="EVENTOS" component={EventScreen} />
            <Tab.Screen name="FAVORITOS" component={FavouriteEventScreen} />
        </Tab.Navigator>
    );
}