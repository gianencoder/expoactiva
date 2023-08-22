import React from 'react'
import { View, Image, Platform } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';

export const HeaderComponent = () => {
    const android = Platform.OS === 'android'
    return (
        <View style={{
            ...headerStyles.icon,
            marginTop: android ? 0 : 30,
            padding: 2.5,

        }}>
            <Image style={{ height: 55, overflow: 'hidden', width: 120 }} source={require('../assets/mainIcon.png')} />
        </View>
    )
}
