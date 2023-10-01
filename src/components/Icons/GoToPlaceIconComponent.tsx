import React, { useContext } from 'react'
import { Image, View } from 'react-native'
import { MyColors } from '../../theme/ColorsTheme'
import { ThemeContext } from '../../context/themeContext/ThemeContext'

export const GoToPlaceIconComponent = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <View>
            <Image source={require('../../assets/icons/camino.png')} style={{ width: 50, height: 50, marginBottom: 5, tintColor: theme.customColors.littleComponentIcon }} />
        </View>
    )
}
