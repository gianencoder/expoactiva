import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { ConfigurationScreen } from '../screens/ConfigurationScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { AboutExpoactivaScreen } from '../screens/AboutExpoactivaScreen';
import { EmailScreen } from '../screens/EmailScreen';



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
            <Stack.Screen name="EditProfileScreen2" component={EditProfileScreen} />
            <Stack.Screen name="PrivacyPolicyScreen2" component={PrivacyPolicyScreen} />
            <Stack.Screen name="AboutExpoactivaScreen" component={AboutExpoactivaScreen} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />


        </Stack.Navigator>

    )
}
