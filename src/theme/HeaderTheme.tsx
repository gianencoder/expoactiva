import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants'
import { MyColors } from './ColorsTheme';
const android = Platform.OS === 'android'
export const headerStyles = StyleSheet.create({

    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        // marginTop: android ? 0 : 30,
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 5,
        alignItems: 'center',
        backgroundColor: MyColors.primary

    }
});