import { View, Text } from '@motify/components'
import React, { useContext } from 'react'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'


export const ConfigurationScreen = () => {

    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...themeConfig.container, backgroundColor: theme.colors.background }}>
            <ConfigurationItemComponent />
        </View>
    )
}
