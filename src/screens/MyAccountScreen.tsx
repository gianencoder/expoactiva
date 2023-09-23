import { View } from '@motify/components'
import React from 'react'
import { Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ProfileStyle } from '../theme/ProfileTheme'

export const ProfileScreen = () => {
    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.iconContainer}>
                <View style={ProfileStyle.iconCircle}>
                    <AntDesign name="user" size={45} color='#616161' style={{ padding: 10 }} />
                </View>
                <Text style={ProfileStyle.txt}>mendoza.gian@hotmail.com</Text>
            </View>
            <View style={ProfileStyle.infoContainer}></View>
            <View style={ProfileStyle.settingContainer}></View>

        </View>
    )
}
