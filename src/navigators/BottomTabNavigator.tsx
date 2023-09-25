import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { TicketsScreen } from '../screens/TicketsScreen';
import { MyColors } from '../theme/ColorsTheme';
import { IconHomeComponent } from '../components/IconHomeComponent';
import { IconUserComponent } from '../components/IconUserComponent';
import { IconMyTicketsComponent } from '../components/IconMyTicketsComponent';
import { ProfileScreen } from '../screens/ProfileScreen';
import { View } from 'react-native'
import { HeaderComponent } from '../components/HeaderComponent';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,

                    tabBarStyle: {
                        backgroundColor: 'rgba(255,255,255,0.90)',
                        position: 'absolute',
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarInactiveTintColor: MyColors.textGrey,

                })}
            >

                <Tab.Screen name='Inicio' component={MyStack} options={{ tabBarIcon: ({ focused }) => (<IconHomeComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? MyColors.primary : 'black'} />) }} />
                <Tab.Screen name='Mis entradas' component={TicketsScreen} options={{ tabBarIcon: ({ focused }) => (<IconMyTicketsComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? MyColors.primary : 'black'} />) }} />
                <Tab.Screen name='Perfil' component={ProfileScreen} options={{ tabBarIcon: ({ focused }) => (<IconUserComponent iconSize={focused ? 25 : 22} txtSize={focused ? 15 : 12} color={focused ? MyColors.primary : 'black'} />) }} />

            </Tab.Navigator >
        </View>

    );
}