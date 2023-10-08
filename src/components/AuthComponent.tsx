import React, { useContext } from 'react'
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native'
import { authStyle } from '../theme/AuthTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'


export const AuthComponent = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={{ ...authStyle.formContainer }}>
                <View style={{ height: 1, width: '10%', backgroundColor: theme.customColors.activeColor, borderRadius: 40 }} />
                <Text style={{ color: theme.colors.text }}>Inicia sesión o registrate</Text>
                <View style={{ height: 1, width: '10%', backgroundColor: theme.customColors.activeColor, borderRadius: 40 }} />
            </View>
            <ScrollView style={{ backgroundColor: theme.colors.background }}
            >
                <View style={{ ...authStyle.buttonContainer }}>
                    <View style={{ ...authStyle.loginButton, backgroundColor: theme.colors.background }}>
                        <TouchableOpacity style={{ ...authStyle.authComponentForm, borderColor: theme.colors.border }}>
                            <Image style={authStyle.img} source={require('../assets/icons/email.png')} />
                            <Text style={{ ...authStyle.btnTxt, color: theme.colors.text }}>Continuar con correo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ ...authStyle.loginButton, backgroundColor: theme.colors.background }}>
                        <TouchableOpacity style={{ ...authStyle.authComponentForm, borderColor: theme.colors.border }}>
                            <Image style={authStyle.img} source={require('../assets/icons/googleIcon.png')} />
                            <Text style={{ ...authStyle.btnTxt, color: theme.colors.text }}>Continuar con google</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}
