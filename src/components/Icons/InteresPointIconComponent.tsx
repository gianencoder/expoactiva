import React from 'react'
import { Image, View } from 'react-native'
import { MyColors } from '../../theme/ColorsTheme'

export const InteresPointIconComponent = () => {
    return (
        <View>
            <Image source={require('../../assets/icons/puntos.interes.png')} style={{ width: 50, height: 50, marginBottom: 5, tintColor: MyColors.primary }} />
        </View>
    )
}
