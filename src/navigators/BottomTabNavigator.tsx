import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { MenuScreen } from '../screens/MenuScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { MyColors } from '../theme/ColorsTheme';
import { Text } from 'react-native';
import { TicketComponet } from '../components/TicketComponet';
import { IconHomeComponent } from '../components/IconHomeComponent';
import { IconMenuComponent } from '../components/IconUserComponent';
import { NotificationScreen } from '../screens/NotificationScreen';
import { IconNotificationComponent } from '../components/IconNotificationComponent';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: MyColors.primary },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: MyColors.textGrey,
                tabBarLabelStyle: { marginTop: 50 },
                tabBarLabel: ({ focused, color }) => {
                    let text: string = '';

                    switch (route.name) {

                        case 'Inicio':
                            text = 'Inicio'
                            break;
                        case 'Mis entradas':
                            text = 'Mis entradas'
                            break;

                        case 'Menu':
                            text = 'Menú'
                            break;

                        case 'Notificaciones':
                            text = 'Notificaciones'
                            break;
                    }
                    return (<Text style={{ fontSize: focused ? 16 : 12, color: focused ? 'white' : MyColors.inactiveText }}>{text}</Text>)
                }

            })}
        >
            <Tab.Screen name='Inicio' component={MyStack} options={{ tabBarIcon: ({ focused }) => (<IconHomeComponent size={focused ? 30 : 24} />) }} />
            <Tab.Screen name='Mis entradas' component={TicketsScreen} options={{ tabBarIcon: ({ focused }) => (<TicketComponet color='white' size={focused ? 30 : 24} />) }} />
            <Tab.Screen name='Notificaciones' component={NotificationScreen} options={{ tabBarIcon: ({ focused }) => (<IconNotificationComponent size={focused ? 30 : 24} />) }} />
            <Tab.Screen name='Menu' component={MenuScreen} options={{ tabBarIcon: ({ focused }) => (<IconMenuComponent size={focused ? 30 : 24} />) }} />

        </Tab.Navigator >

    );
}