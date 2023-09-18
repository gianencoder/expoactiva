import { View } from '@motify/components'
import React from 'react'
import { Image } from 'react-native'
interface Props {
    size: number
}
export const IconNotificationComponent = ({ size }: Props) => {
    return (
        <View>
            <Image style={{ width: size, height: size }} source={require('../assets/icons/campana.png')} />
        </View>
    )
}
