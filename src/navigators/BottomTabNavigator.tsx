import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './StackNavigator';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Octicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { TicketsScreen } from '../screens/TicketsScreen';
import { MyColors } from '../theme/ColorsTheme';
import { View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { Text } from 'react-native';
import { TicketComponet } from '../components/TicketComponet';
import { IconHomeComponent } from '../components/IconHomeComponent';


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
                            color: focused ? 'white' : MyColors.inactiveText
                            break;
                        case 'Mis entradas':
                            text = 'Mis entradas'
                            color: focused ? 'white' : MyColors.inactiveText
                            break;

                        case 'Mi perfil':
                            text = 'Mi perfil'
                            color: focused ? 'white' : MyColors.inactiveText
                            break;



                    }
                    return (<Text style={{ fontSize: focused ? 16 : 15, color: color }}>{text}</Text>)
                }

            })}
        >
            <Tab.Screen name='Inicio' component={MyStack} options={{ tabBarIcon: ({ focused }) => (<IconHomeComponent size={focused ? 30 : 24} />) }} />
            <Tab.Screen name='Mis entradas' component={TicketsScreen} options={{ tabBarIcon: ({ focused }) => (<TicketComponet color='white' size={focused ? 30 : 24} />) }} />
            <Tab.Screen name='Mi perfil' component={ProfileScreen} options={{ tabBarIcon: ({ focused }) => (<Feather name="user" size={focused ? 30 : 24} color={focused ? 'white' : MyColors.inactiveText} />) }} />
        </Tab.Navigator >


        // <Tab.Navigator
        //     screenOptions={({ route }) => ({
        //         headerShown: false,
        //         tabBarStyle: {
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //             height: '10.5%',
        //             paddingTop: 5,
        //             backgroundColor: MyColors.primary
        //         },
        //         tabBarActiveTintColor: MyColors.white,
        //         tabBarInactiveTintColor: MyColors.white,
        //         tabBarLabelStyle: {
        //             fontSize: 13,
        //         },

        //         tabBarIcon: ({ focused }) => {
        //             let iconName: any;
        //             switch (route.name) {
        //                 case 'Inicio':
        //                     iconName = !focused ? 'home-outline' : 'home'
        //                     break;
        //                 case 'Mis entradas':
        //                     iconName = !focused ? 'ticket-confirmation-outline' : 'ticket-confirmation'
        //                     break;
        //                 case 'Perfil':
        //                     iconName = !focused ? 'account-settings-outline' : 'account-settings'
        //                     break;
        //             }
        //             return <MaterialCommunityIcons name={iconName} size={!focused ? 32 : 42} color={'white'} />
        //         }
        //     })}
        // >
        //     <Tab.Screen name="Inicio" component={MyStack} />
        //     <Tab.Screen name="Mis entradas" component={TicketsScreen} />
        //     <Tab.Screen name="Perfil" component={ProfileScreen} />
        // </Tab.Navigator >
    );
}