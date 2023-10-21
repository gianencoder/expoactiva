import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { useNavigation } from '@react-navigation/native'

export const NotEventScreen = ({ text, extraoption }) => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    return (

        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: theme.colors.background, gap: 18 }}>
            <Text style={{ fontSize: 20, color: 'gray' }}>{text}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('TopTabNavigtorEvent', { screen: 'Eventos' })} style={{ justifyContent: 'center', borderRadius: 15 }}>
                <Text style={{ fontSize: 18, color: 'gray', fontWeight: 'bold' }}>{extraoption}</Text>
            </TouchableOpacity>
        </View>



    )
}
