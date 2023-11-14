import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { View } from 'react-native'
import { ConfigurationScreen } from '../screens/ConfigurationScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { NotificationScreen } from '../screens/NotificationScreen';


const Stack = createStackNavigator();
export const ConfigurationNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureVelocityImpact: 1500,
                headerShown: false
            }}

        >
            <Stack.Screen name='ConfigurationScreen' component={ConfigurationScreen} />
            <Stack.Screen name="AuthScreen2" component={AuthScreen} />
            <Stack.Screen name="NotificationScreen2" component={NotificationScreen} />
        </Stack.Navigator>

    )
}
