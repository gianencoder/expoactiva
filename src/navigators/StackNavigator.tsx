import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { InterestPointScreen } from '../screens/InterestPointScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { GoToPlaceScreen } from '../screens/GoToPlaceScreen';
import { WhereIsMyCarScreen } from '../screens/WhereIsMyCarScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { FavouriteEventScreen } from '../screens/FavouriteEventScreen';
import { EventScreen } from '../screens/EventScreen';
import { TopTabNavigator } from './TopTabNavigator';

const Stack = createStackNavigator();

export const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                // title: '',
                // headerBackTitleVisible: false,
                // headerShadowVisible: false,
                // headerTintColor: MyColors.primary,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                gestureVelocityImpact: 15,
                headerShown: false
            }}

        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MenuScreen" component={MenuScreen} />
            <Stack.Screen name="EventScreen" component={TopTabNavigator} />
            <Stack.Screen name="TicketsScreen" component={TicketsScreen} />
            <Stack.Screen name="InterestPointScreen" component={InterestPointScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="GoToPlaceScreen" component={GoToPlaceScreen} />
            <Stack.Screen name="WhereIsMyCarScreen" component={WhereIsMyCarScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="FavouriteEvent" component={FavouriteEventScreen} />

        </Stack.Navigator >
    );
}