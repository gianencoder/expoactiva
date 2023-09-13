import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { InterestPointScreen } from '../screens/InterestPointScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { TopTabNavigator } from './TopTabNavigator';
import { GoToPlaceScreen } from '../screens/GoToPlaceScreen';
import { WhereIsMyCarScreen } from '../screens/WhereIsMyCarScreen';
import { MyColors } from '../theme/ColorsTheme';


const Stack = createStackNavigator();

export const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                title: '',
                headerStatusBarHeight: -15,
                headerBackTitle: 'Atrás',
                headerBackTitleStyle: { fontSize: 20, fontWeight: '600', alignItems: 'center' },
                headerBackTitleVisible: true,
                headerShadowVisible: false,
                headerTintColor: MyColors.primary,
                headerBackAllowFontScaling: true,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                gestureVelocityImpact: 5
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EventScreen" component={TopTabNavigator} />
            <Stack.Screen name="TicketsScreen" component={TicketsScreen} />
            <Stack.Screen name="InterestPointScreen" component={InterestPointScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="GoToPlaceScreen" component={GoToPlaceScreen} />
            <Stack.Screen name="WhereIsMyCarScreen" component={WhereIsMyCarScreen} />
        </Stack.Navigator >
    );
}