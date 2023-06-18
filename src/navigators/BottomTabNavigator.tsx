import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Foundation } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';
import { TicketsScreen } from '../screens/TicketsScreen';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: MyColors.primary,
                headerShown: false,
                tabBarIcon: () => {
                    let iconName = '';
                    let iconSource = ''

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Mis entradas':
                            iconName = 'ticket';
                            break;
                        case 'Configuracion':
                            iconName = 'widget';
                            break;
                    }
                    return <Foundation name={iconName} size={24} color={MyColors.primary} />
                }
            })}
        >
            <Tab.Screen name="Home" component={MyStack} />
            <Tab.Screen name="Mis entradas" component={TicketsScreen} />
            <Tab.Screen name="Configuracion" component={ProfileScreen} />
        </Tab.Navigator >
    );
}