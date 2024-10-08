import React, { useContext } from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import { headerStyles } from '../theme/HeaderTheme';
import { NavigationHook } from '../hooks/NavigationHook';
import { ThemeContext } from '../context/themeContext/ThemeContext';


export const HeaderComponent = () => {
    const { goBack, navigation } = NavigationHook()
    const { theme } = useContext(ThemeContext)
    return (
        <View style={
            { ...headerStyles.icon, backgroundColor: theme.customColors.headerColor }}>
            <View style={{ width: '100%', position: 'absolute' }}>
                {goBack && (<TouchableOpacity onPress={navigation.goBack} style={{ width: 45, height: 25, justifyContent: 'center' }} hitSlop={{ top: 20, bottom: 20, left: 20, right: 50 }}>
                    <Image style={{ width: 35, height: 15, tintColor: 'white' }} source={require('../assets/icons/leftarrow.png')} />
                </TouchableOpacity>)}
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('HomeScreen')}>
                    <Image style={{ height: 50, width: 120 }} source={require('../assets/icons/expoactivaNacional.png')} />
                </TouchableOpacity>

            </View>
        </View >
    )
}
