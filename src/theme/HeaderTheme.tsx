import { Platform, StyleSheet } from 'react-native';
const android = Platform.OS === 'android'
export const headerStyles = StyleSheet.create({

    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: android ? 0 : 30,
        position: 'relative',
    }
});