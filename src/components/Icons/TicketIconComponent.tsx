import React, { useContext } from 'react'
import { Image, View } from 'react-native'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { MyColors } from '../../theme/ColorsTheme'

export const TicketIconComponent = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <View>
            <Image source={require('../../assets/icons/tickets.png')} style={{ width: 50, height: 50, marginBottom: 5, tintColor: theme.customColors.littleComponentIcon }} />
        </View>

    )
}
