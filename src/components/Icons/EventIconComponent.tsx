import { View } from '@motify/components'
import React, { useContext } from 'react'
import { Image } from 'react-native'
import { ThemeContext } from '../../context/themeContext/ThemeContext'


export const EventIconComponent = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <View>
            <Image source={require('../../assets/icons/evento.png')} style={{ width: 50, height: 50, marginBottom: 5, tintColor: theme.customColors.littleComponentIcon }} />
        </View>
    )
}
