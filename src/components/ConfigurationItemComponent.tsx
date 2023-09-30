
import React, { useContext } from 'react'
import { View, Text, Image, useWindowDimensions } from 'react-native'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { SeparatorComponent } from './SeparatorComponent'

export const ConfigurationItemComponent = () => {
    const { width, height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...themeConfig.configScreen, backgroundColor: theme.colors.background }}>

            <View style={{ ...themeConfig.itemContainer }}>
                <View style={themeConfig.item}>
                    <Image style={{ width: width / 30, height: height / 45, tintColor: 'black' }}
                        source={require('../assets/icons/usuarios.png')} />
                    <Text >
                        Mi cuenta
                    </Text>
                </View>
                <View>
                    <Image style={{ width: width / 30, height: height / 45, tintColor: 'black' }}
                        source={require('../assets/icons/right.arrow.png')} />
                </View>
            </View>
            <SeparatorComponent />

        </View>
    )
}
