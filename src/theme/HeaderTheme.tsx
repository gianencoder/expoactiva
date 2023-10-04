import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'
import { MyColors } from './ColorsTheme';
export const headerStyles = StyleSheet.create({

    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 5,
        alignItems: 'center',
    }
});