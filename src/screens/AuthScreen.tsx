import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { authStyle } from '../theme/AuthTheme';
import { styles } from '../theme/GlobalTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const AuthScreen = () => {

    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...authStyle.authCard, backgroundColor: theme.colors.background }}>
            <View>
                <Text style={{ ...authStyle.title, color: theme.colors.text }}>Iniciar Sesión</Text>
            </View>
        </View>


    )
}
