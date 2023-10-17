import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { useNavigation } from '@react-navigation/native'

export const NotEventScreen = ({ text, extraoption }) => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>

            <View style={{ justifyContent: 'space-between', height: 80, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'gray' }}>{text}</Text>

                <TouchableOpacity onPress={() => navigation.navigate('TopTabNavigtorEvent', { screen: 'Eventos' })} style={{ height: 50, justifyContent: 'center', borderRadius: 15 }}>
                    <Text style={{ fontSize: 18, color: 'gray', fontWeight: 'bold' }}>{extraoption}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}
