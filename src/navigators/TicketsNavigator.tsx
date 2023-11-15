import { createStackNavigator } from '@react-navigation/stack';
import { TicketsScreen } from '../screens/TicketsScreen';
import { BuyTicketScreen } from '../screens/BuyTicketScreen';
import { ReedemTicketScreen } from '../screens/ReedemTicketScreen';
import { TicketDetail } from '../screens/TicketDetailScreen';

const Stack = createStackNavigator();
export const TicketsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureVelocityImpact: 1500,
                headerShown: false
            }}

        >
            <Stack.Screen name='TicketsScreen' component={TicketsScreen} />
            <Stack.Screen name="BuyTicketScreen2" component={BuyTicketScreen} />
            <Stack.Screen name="ReedemTicketScreen2" component={ReedemTicketScreen} />
            <Stack.Screen name="TicketDetail2" component={TicketDetail} />
        </Stack.Navigator>

    )
}
