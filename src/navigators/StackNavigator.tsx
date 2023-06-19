import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { InterestPointScreen } from '../screens/InterestPointScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { EventScreen } from '../screens/EventScreen';


const Stack = createStackNavigator();

export const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EventScreen" component={EventScreen} />
            <Stack.Screen name="TicketsScreen" component={TicketsScreen} />
            <Stack.Screen name="InterestPointScreen" component={InterestPointScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    );
}