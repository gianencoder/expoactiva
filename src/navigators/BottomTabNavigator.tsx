import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { TicketsScreen } from '../screens/TicketsScreen';
import { MyColors } from '../theme/ColorsTheme';
import { Text } from 'react-native';
import { IconHomeComponent } from '../components/IconHomeComponent';
import { IconMenuComponent } from '../components/IconUserComponent';
import { IconNotificationComponent } from '../components/IconNotificationComponent';
import { ProfileScreen } from '../screens/MyAccountScreen';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                // tabBarShowLabel: false,

                tabBarStyle: {
                    backgroundColor: 'rgba(255,255,255,0.80)',
                    position: 'absolute',
                    height: 55
                },
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: MyColors.textGrey,

                tabBarLabel: ({ focused }) => {
                    let text: string = '';

                    switch (route.name) {

                        case 'Inicio':
                            text = 'Inicio'
                            break;
                        case 'Mis entradas':
                            text = 'Mis entradas'
                            break;

                        case 'Perfil':
                            text = 'Perfil'
                            break;

                        case 'Mis entradas':
                            text = 'Mis entradas'
                            break;
                    }
                    return (<Text style={{ fontSize: focused ? 16 : 12, color: MyColors.primary, marginBottom: 5 }}>{text}</Text>)
                },


            })}
        >
            <Tab.Screen name='Inicio' component={MyStack} options={{ tabBarIcon: ({ focused }) => (<IconHomeComponent size={focused ? 30 : 24} />) }} />
            <Tab.Screen name='Mis entradas' component={TicketsScreen} options={{ tabBarIcon: ({ focused }) => (<IconNotificationComponent size={focused ? 30 : 24} />) }} />
            <Tab.Screen name='Perfil' component={ProfileScreen} options={{ tabBarIcon: ({ focused }) => (<IconMenuComponent size={focused ? 30 : 24} />) }} />

        </Tab.Navigator >

    );
}