import { View } from '@motify/components'
import React from 'react'
import { Image, Text } from 'react-native'

export const IconUserComponent = ({ color, txtSize, iconSize }: BottomTabIcons) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <Image style={{ width: iconSize, height: iconSize, tintColor: color }} source={require('../assets/icons/usuarios.png')} />
            <Text style={{ color: color, fontSize: txtSize, fontWeight: '600' }}>Mi perfil</Text>
        </View>
    )
}
