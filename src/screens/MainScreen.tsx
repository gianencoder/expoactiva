import React from 'react'
import { View, Image } from 'react-native';
import { MyColors } from '../theme/ColorsTheme'

export const MainScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: MyColors.primary, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/mainIcon.png')} />
        </View>
    )
}
