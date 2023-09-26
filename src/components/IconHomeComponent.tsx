import { View } from '@motify/components'
import React from 'react'
import { Image, Text } from 'react-native'


export const IconHomeComponent = ({ color, txtSize, iconSize }: BottomTabIcons) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <Image style={{ width: iconSize, height: iconSize, tintColor: color, overlayColor: 'red' }} source={require('../assets/icons/hogar.png')} />
            <Text style={{ color: color, fontSize: txtSize, fontWeight: '400' }}>Inicio</Text>
        </View>
    )
}
