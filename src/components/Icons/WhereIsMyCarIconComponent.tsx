import React, { useContext } from 'react'
import { Image, View } from 'react-native'
import { ThemeContext } from '../../context/themeContext/ThemeContext'

export const WhereIsMyCarIconComponent = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <View>
            <Image source={require('../../assets/icons/ubicacion.auto.png')} style={{ width: 50, height: 50, marginBottom: 5, tintColor: theme.customColors.littleComponentIcon }} />
        </View>

    )
}
