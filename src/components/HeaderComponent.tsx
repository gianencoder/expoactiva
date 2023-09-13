import React from 'react'
import { View, Image, Platform } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';

export const HeaderComponent = () => {
    const android = Platform.OS === 'android'
    return (
        <View style={{
            ...headerStyles.icon,
            marginTop: android ? 0 : 30,
            paddingTop: 10,
            bottom: 8,
        }}>
            <Image style={{ height: 52, overflow: 'hidden', width: 120 }} source={require('../assets/icons/mainIcon.png')} />
        </View>
    )
}
