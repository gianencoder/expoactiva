import React from 'react'
import { Image, View } from 'react-native'
import { MyColors } from '../../theme/ColorsTheme'

export const TicketIconComponent = () => {
    return (
        <View>
            <Image source={require('../../assets/icons/tickets.png')} style={{ width: 50, height: 50, marginBottom: 5, tintColor: MyColors.primary }} />
        </View>

    )
}
