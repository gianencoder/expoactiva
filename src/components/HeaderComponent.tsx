import React from 'react'
import { View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';
import { Ionicons } from '@expo/vector-icons';
import { NavigationHook } from '../hooks/NavigationHook';

export const HeaderComponent = () => {
    const { goBack, navigation } = NavigationHook()
    const { width, height } = useWindowDimensions()
    return (
        <View style={
            headerStyles.icon}>
            <View style={{ width: '100%', position: 'absolute' }}>
                {goBack && (<TouchableOpacity onPress={navigation.goBack}>
                    <Ionicons name="chevron-back" size={30} color={'white'} />
                </TouchableOpacity>)}
            </View>
            <View>
                <Image style={{ height: height / 12, width: width / 3 }} source={require('../assets/icons/expoactivaNacional.png')} />
            </View>
        </View >
    )
}
