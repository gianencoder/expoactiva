import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';
import { Ionicons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';
import { NavigationHook } from '../hooks/NavigationHook';

export const HeaderComponent = () => {
    const { goBack, navigation } = NavigationHook()
    return (
        <View style={
            headerStyles.icon}>
            <View style={{ flex: 1.1, justifyContent: 'center' }}>
                {goBack && (<TouchableOpacity onPress={navigation.goBack} style={{ width: '50%' }}>
                    <Ionicons name="chevron-back" size={30} color={MyColors.primary} />
                </TouchableOpacity>)}
            </View>
            <View style={{ flex: 2 }}>
                <Image style={{ height: 52, width: 120 }} source={require('../assets/icons/mainIcon.png')} />
            </View>
        </View >
    )
}
