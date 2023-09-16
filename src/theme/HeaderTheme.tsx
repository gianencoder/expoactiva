import { Platform, StyleSheet } from 'react-native';
const android = Platform.OS === 'android'
export const headerStyles = StyleSheet.create({

    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: android ? 0 : 45,
    }
});