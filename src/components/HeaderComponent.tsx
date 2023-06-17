import React from 'react'
import { View, Image, Platform } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';

export const HeaderComponent = () => {
    const android = Platform.OS === 'android'
    return (
        <View style={{
            ...headerStyles.icon,
            marginTop: android ? 0 : 30,
        }}>
            <Image source={require('../assets/en2023.png')} />
        </View>
    )
}
