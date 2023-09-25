import React, { useContext, useEffect } from 'react'
import { View } from '@motify/components'
import { Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ProfileStyle } from '../theme/ProfileTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const ProfileScreen = () => {
    const { setDarkTheme, setLightTheme, theme } = useContext(ThemeContext)


    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.iconContainer}>
                <View style={ProfileStyle.iconCircle}>
                    <AntDesign name="user" size={45} color='#616161' style={{ padding: 10 }} />
                </View>
                <Text style={ProfileStyle.txt}>mendoza.gian@hotmail.com</Text>
            </View>
            <View style={ProfileStyle.infoContainer}></View>



            <View style={ProfileStyle.settingContainer}>
                <TouchableOpacity
                    onPress={setLightTheme}
                    activeOpacity={.8}
                    style={{
                        backgroundColor: theme.colors.primary,
                        justifyContent: 'center',
                        height: 40,
                        width: 130,
                        borderRadius: 20,
                    }}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16

                    }}>
                        Light
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={setDarkTheme}
                    activeOpacity={.8}
                    style={{
                        backgroundColor: theme.colors.primary,
                        justifyContent: 'center',
                        height: 40,
                        width: 130,
                        borderRadius: 20,
                    }}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16

                    }}>
                        Dark
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
