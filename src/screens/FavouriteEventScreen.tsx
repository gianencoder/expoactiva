import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export const FavouriteEventScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange' }}>

            <ActivityIndicator color={'white'} size={'large'} style={{}}></ActivityIndicator>
            <Text style={{ color: 'white', fontWeight: '700' }}>Cargando...</Text>
        </View>
    )
}
