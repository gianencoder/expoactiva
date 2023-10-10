import React, { useContext } from 'react'
import { View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';

import { NavigationHook } from '../hooks/NavigationHook';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { StackScreenProps } from '@react-navigation/stack';

export const HeaderComponent = () => {
    const { goBack, navigation } = NavigationHook()
    const { width, height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)
    return (
        <View style={
            { ...headerStyles.icon, backgroundColor: theme.customColors.headerColor }}>
            <View style={{ width: '100%', position: 'absolute' }}>
                {goBack && (<TouchableOpacity
                    onPress={navigation.goBack}
                    style={{ width: 45, height: 25, justifyContent: 'center', marginLeft: 5 }}
                    hitSlop={{ right: 50, left: 50, top: 50, bottom: 50 }}
                >
                    <Image style={{ width: width / 16, height: height / 30, tintColor: 'white' }} source={require('../assets/icons/leftarrow.png')} />
                </TouchableOpacity>)}
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Image style={{ height: 50, width: 120 }} source={require('../assets/icons/expoactivaNacional.png')} />
            </View>
        </View >
    )
}
