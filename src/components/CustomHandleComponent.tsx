import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'


export const CustomHandleComponent = () => {

    const { theme } = useContext(ThemeContext)

    return (

        <View style={{ height: 5, backgroundColor: theme.customColors.activeColor, width: 60, alignSelf: 'center', borderRadius: 50, marginTop: 10, marginBottom: -15 }} />


    )
}
