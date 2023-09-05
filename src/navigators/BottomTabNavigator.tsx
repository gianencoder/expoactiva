import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { ProfileScreen } from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TicketsScreen } from '../screens/TicketsScreen';
import { MyColors } from '../theme/ColorsTheme';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    height: '10%'
                },
                tabBarActiveTintColor: MyColors.primary,
                tabBarInactiveTintColor: '#464646',
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 14,
                    bottom: 6,
                },

                tabBarIcon: ({ focused, color }) => {
                    let iconName: any;
                    switch (route.name) {
                        case 'Inicio':
                            iconName = !focused ? 'home-outline' : 'home'
                            break;
                        case 'Mis entradas':
                            iconName = !focused ? 'ticket-confirmation-outline' : 'ticket-confirmation'
                            break;
                        case 'Perfil':
                            iconName = !focused ? 'account-settings-outline' : 'account-settings'
                            break;
                    }
                    return <MaterialCommunityIcons name={iconName} size={32} color={'#237851'} />
                }
            })}
        >
            <Tab.Screen name="Inicio" component={MyStack} />
            <Tab.Screen name="Mis entradas" component={TicketsScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator >
    );
}