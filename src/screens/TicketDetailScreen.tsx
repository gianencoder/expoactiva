import React, { useContext } from 'react'
import { View, Image } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const TicketDetail = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
            <Image style={{ width: '80%', height: '80%', resizeMode: 'contain', tintColor: theme.colors.text }} source={require('../assets/images/codigo-qr.png')} />
        </View>
    )
}
