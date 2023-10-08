import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { InterestPointScreen } from '../screens/InterestPointScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { GoToPlaceScreen } from '../screens/GoToPlaceScreen';
import { WhereIsMyCarScreen } from '../screens/WhereIsMyCarScreen';
import { VisibilityScreen } from '../screens/VisibilityScreen';
import { FavouriteEventScreen } from '../screens/FavouriteEventScreen';
import { TopTabNavigator } from './TopTabNavigator';
import { ConfigurationScreen } from '../screens/ConfigurationScreen';
<<<<<<< HEAD
import { View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { MyColors } from '../theme/ColorsTheme';
import { ModalComponent } from '../components/ModalComponent';
// import { ModalComponent } from '../components/ModalComponent';
=======
>>>>>>> eef1316788a02400e8c53c4d6ad19cb4df81ee16

const Stack = createStackNavigator();

export const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
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
            <Stack.Screen name="Configuration" component={ConfigurationScreen} />

<<<<<<< HEAD
        <View style={{ flex: 1, backgroundColor: MyColors.primary }}>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    gestureVelocityImpact: 15,
                    headerShown: false
                }}
            >
                <Stack.Screen name="HomeScreen" component={ConfigurationScreen} />
                <Stack.Screen name="MenuScreen" component={MenuScreen} />
                <Stack.Screen name="EventScreen" component={TopTabNavigator} />
                <Stack.Screen name="TicketsScreen" component={TicketsScreen} />
                <Stack.Screen name="InterestPointScreen" component={InterestPointScreen} />
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
                <Stack.Screen name="GoToPlaceScreen" component={GoToPlaceScreen} />
                <Stack.Screen name="WhereIsMyCarScreen" component={WhereIsMyCarScreen} />
                <Stack.Screen name="VisibilityScreen" component={VisibilityScreen} />
                <Stack.Screen name="FavouriteEvent" component={FavouriteEventScreen} />
                <Stack.Screen name="Configuration" component={ConfigurationScreen} />
            </Stack.Navigator >
        </View>
=======
        </Stack.Navigator >
>>>>>>> eef1316788a02400e8c53c4d6ad19cb4df81ee16
    );
}