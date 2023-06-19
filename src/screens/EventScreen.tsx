import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { eventStyle } from '../theme/EventTheme'

export const EventScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={eventStyle.container}>
                <Text style={eventStyle.optionTxt}>Todos los eventos</Text>
                <Text style={eventStyle.optionTxt}>Mis eventos</Text>
                {/* <TextInput style={eventStyle.searcher} placeholder='Buscar evento...' /> */}
            </View>


            <View style={eventStyle.container2}>
                {/* <Image source={URL}></Image>  */}
            </View>
        </View>
    )
}
