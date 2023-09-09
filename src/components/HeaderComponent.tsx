import React from 'react'
import { View, Image, Platform } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';
import { MyColors } from '../theme/ColorsTheme';

export const HeaderComponent = () => {
    const android = Platform.OS === 'android'
    return (
        <View style={{
            ...headerStyles.icon,
            marginTop: android ? 0 : 30,
            padding: 2.5,
            backgroundColor: MyColors.white
        }}>
            <Image style={{ height: 55, overflow: 'hidden', width: 120 }} source={require('../assets/icons/mainIcon.png')} />
        </View>
    )
}
