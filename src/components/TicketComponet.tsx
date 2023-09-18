import { View } from '@motify/components'
import React from 'react'
import { Image } from 'react-native'

interface Props {
    color: string,
    size: number
}

export const TicketComponet = ({ color, size }: Props) => {
    return (
        <View>
            <Image style={{ width: size, height: size }} source={require('../assets/icons/boleto.png')} />
        </View>
    )
}
