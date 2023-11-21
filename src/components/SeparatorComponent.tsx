import React from 'react'
import { View } from 'react-native'
import { MyColors } from '../theme/ColorsTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const SeparatorComponent = () => {
    const { theme } = React.useContext(ThemeContext)
    return (
        <View style={{ backgroundColor: theme.currentTheme === 'light' ? '#939393' : '#383838', height: 0.45, borderRadius: 150 }} />
    )
}
