import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { ConfigurationScreen } from '../screens/ConfigurationScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { AboutExpoactivaScreen } from '../screens/AboutExpoactivaScreen';
import { EmailScreen } from '../screens/EmailScreen';
import { LoginFormScreen } from '../screens/LoginFormScreen';
import { ValidateCodeScreen } from '../screens/ValidateCodeScreen';
import { HomeScreen } from '../screens/HomeScreen';



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
            <Stack.Screen name="LoginFormScreen2" component={LoginFormScreen} />
            <Stack.Screen name="CodeValidation2" component={ValidateCodeScreen} />
            <Stack.Screen name="PrivacyPolicyScreen2" component={PrivacyPolicyScreen} />
            <Stack.Screen name="AboutExpoactivaScreen" component={AboutExpoactivaScreen} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />
            <Stack.Screen name="HomeScreen2" component={HomeScreen} />


        </Stack.Navigator>

    )
}
