import React from 'react'
import { View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';

import { NavigationHook } from '../hooks/NavigationHook';

export const HeaderComponent = () => {
    const { goBack, navigation } = NavigationHook()
    const { width, height } = useWindowDimensions()
    return (
        <View style={
            headerStyles.icon}>
            <View style={{ width: '100%', position: 'absolute' }}>
                {goBack && (<TouchableOpacity onPress={navigation.goBack}>
                    <Image style={{ width: width / 35, height: height / 35, tintColor: 'white' }} source={require('../assets/icons/leftarrow.png')} />
                </TouchableOpacity>)}
            </View>

            <View style={{ flexDirection: 'row' }}>

                <Image style={{ height: 50, width: 120 }} source={require('../assets/icons/expoactivaNacional.png')} />
            </View>
        </View >
    )
}
