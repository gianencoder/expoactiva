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
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '10.5%',
                    paddingTop: 5,
                    backgroundColor: MyColors.primary
                },
                tabBarActiveTintColor: MyColors.white,
                tabBarInactiveTintColor: MyColors.white,
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 13,
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
                    return <MaterialCommunityIcons name={iconName} size={32} color={'white'} />
                }
            })}
        >
            <Tab.Screen name="Inicio" component={MyStack} />
            <Tab.Screen name="Mis entradas" component={TicketsScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator >
    );
}