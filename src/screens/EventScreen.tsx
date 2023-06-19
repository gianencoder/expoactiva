import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { eventStyle } from '../theme/EventTheme'

export const EventScreen = () => {
    return (

        <View style={eventStyle.container}>
            <Text style={eventStyle.optionTxt}>Todos los eventos</Text>
        </View>

    )
}
