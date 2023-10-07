import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

export const headerStyles = StyleSheet.create({

    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 5,
        alignItems: 'center',
    }
});