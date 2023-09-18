import { View } from '@motify/components'
import React from 'react'
import { Image } from 'react-native'

interface Props { size: number }

export const IconMenuComponent = ({ size }: Props) => {
    return (
        <View>
            <Image source={require('../assets/icons/menu.png')} style={{ width: size, height: size }} />
        </View>
    )
}
