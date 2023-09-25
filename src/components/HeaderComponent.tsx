import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';
import { Ionicons } from '@expo/vector-icons';
import { NavigationHook } from '../hooks/NavigationHook';

export const HeaderComponent = () => {
    const { goBack, navigation } = NavigationHook()
    return (
        <View style={
            headerStyles.icon}>
            <View style={{ flex: 0.96, justifyContent: 'center' }}>
                {goBack && (<TouchableOpacity onPress={navigation.goBack} style={{ width: '50%' }}>
                    <Ionicons name="chevron-back" size={30} color={'white'} />
                </TouchableOpacity>)}
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <Image style={{ height: 55, width: 130 }} source={require('../assets/icons/expoactivaNacional.png')} />
            </View>
        </View >
    )
}
