import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { EventScreen } from '../screens/EventScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { MyColors } from '../theme/ColorsTheme';
import { FavouriteEventScreen } from '../screens/FavouriteEventScreen';

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: MyColors.primary,
                tabBarIndicatorStyle: {
                    backgroundColor: MyColors.primary
                }
            }}
        >
            <Tab.Screen name="EVENTOS" component={EventScreen} />
            <Tab.Screen name="MIS EVENTOS" component={FavouriteEventScreen} />
        </Tab.Navigator>
    );
}