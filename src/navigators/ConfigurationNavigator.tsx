import { createStackNavigator } from '@react-navigation/stack';
import { ConfigurationScreen } from '../screens/ConfigurationScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';


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
            <Stack.Screen name="PrivacyPolicyScreen2" component={PrivacyPolicyScreen} />
        </Stack.Navigator>

    )
}
