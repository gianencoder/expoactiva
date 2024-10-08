import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { InterestPointScreen } from '../screens/InterestPointScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { GoToPlaceScreen } from '../screens/GoToPlaceScreen';
import { WhereIsMyCarScreen } from '../screens/WhereIsMyCarScreen';
import { FavouriteEventScreen } from '../screens/FavouriteEventScreen';
import { TopTabNavigator } from './TopTabNavigator';
import { ExhibitorScreen } from '../screens/ExhibitorScreen';
import { EventDetails } from '../screens/EventDetails';
import { EventScreen } from '../screens/EventScreen';
import { ExhibitorDetails } from '../screens/ExhibitorDetails';
import { TicketDetail } from '../screens/TicketDetailScreen';
import { BuyTicketScreen } from '../screens/BuyTicketScreen';
import { ValidateCodeScreen } from '../screens/ValidateCodeScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { LoginFormScreen } from '../screens/LoginFormScreen'
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { ReedemTicketScreen } from '../screens/ReedemTicketScreen';


const Stack = createStackNavigator();
export const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureVelocityImpact: 1500,
                headerShown: false
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="TopTabNavigtorEvent" component={TopTabNavigator} />
            <Stack.Screen name="TicketsScreen" component={TicketsScreen} />
            <Stack.Screen name="InterestPointScreen" component={InterestPointScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="GoToPlaceScreen" component={GoToPlaceScreen} />
            <Stack.Screen name="WhereIsMyCarScreen" component={WhereIsMyCarScreen} />
            <Stack.Screen name="FavouriteEvent" component={FavouriteEventScreen} />
            <Stack.Screen name="Exhibitors" component={ExhibitorScreen} />
            <Stack.Screen name="EventDetail" component={EventDetails} />
            <Stack.Screen name="EventScreen" component={EventScreen} />
            <Stack.Screen name="ExhibitorDetail" component={ExhibitorDetails} />
            <Stack.Screen name="TicketDetail" component={TicketDetail} />
            <Stack.Screen name="BuyTicket" component={BuyTicketScreen} />
            <Stack.Screen name="CodeValidation" component={ValidateCodeScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="LoginFormScreen" component={LoginFormScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="ReedemTicketScreen" component={ReedemTicketScreen} />
        </Stack.Navigator >
    );
}