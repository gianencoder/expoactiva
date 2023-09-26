import { View } from '@motify/components'
import React from 'react'
import { Image } from 'react-native'
import { MyColors } from '../../theme/ColorsTheme'

export const MyProfileIconComponent = () => {
    return (
        <View>
            <Image source={require('../../assets/icons/user.png')} style={{ width: 50, height: 50, marginBottom: 5, tintColor: MyColors.primary }} />
        </View>
    )
}
