import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'


export const CustomHandleComponent = () => {

    const { theme } = useContext(ThemeContext)

    return (

        <View style={{ height: 4, backgroundColor: theme.colors.text, width: 60, alignSelf: 'center', borderRadius: 50, marginTop: 5 }} />


    )
}
