import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { useNavigation } from '@react-navigation/native'

export const NotEventScreen = ({ text, extraoption }) => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : 'height'}
            style={
                { flex: 1, backgroundColor: theme.colors.background }
            }>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ justifyContent: 'space-around', height: '50%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'gray' }}>{text}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TopTabNavigtorEvent', { screen: 'Eventos' })} style={{ height: 50, justifyContent: 'center', borderRadius: 15 }}>
                        <Text style={{ fontSize: 18, color: 'gray', fontWeight: 'bold' }}>{extraoption}</Text>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}
