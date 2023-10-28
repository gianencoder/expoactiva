import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from './ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'


interface Props {
    email: string
    password: string
    setPassword: (text: string) => void
    signIn: (email: string, password: string) => void
}

export const AuthPasswordComponent = ({ email, password, setPassword, signIn }: Props) => {
    const validPassword = /^(?=.*[A-Za-z0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    const { theme } = useContext(ThemeContext)
    const [isValid, setIsValid] = useState(true)
    const [securePass, setSecurePass] = useState(true)

    const handleShowPassword = (param: number) => {

        if (param == 0) setSecurePass(true)
        if (param == 1) setSecurePass(false)

    }

    const handleButtonPress = () => {
        if (!validPassword.test(password)) {
            setIsValid(false)
            setTimeout(() => {
                setIsValid(true)
            }, 2500)
        } else {
            signIn(email, password)
        }
    };
    return (
        <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
            <ToastMessageComponent iconName={'closecircleo'} textColor={'white'} iconColor={'white'} iconSize={24} backgroundColor={'#950101'} visible={!isValid} title={'¡Error!'} message={password != '' ? 'La contraseña no es válida' : 'No puedes dejar el campo vacío'} />
            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 19, color: theme.colors.text }}>Iniciar Sesión</Text>


            <View style={authStyle.formView}>
                <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Contraseña (Debe contener 8 o más caracteres)</Text>

                <TextInput
                    clearButtonMode='while-editing'
                    keyboardType='visible-password'
                    autoCorrect={false}
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                    placeholder='Contraseña'
                    placeholderTextColor={'gray'}
                    maxLength={20}
                />
            </View>
            <Text style={{ fontWeight: '400', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 16, padding: 10, textDecorationLine: 'underline' }}>Olvide mi contraseña</Text>

            <TouchableOpacity
                onPress={handleButtonPress}
                style={{
                    backgroundColor: validPassword.test(password) ? theme.customColors.buttonColor : '#DBD8E3'
                    , height: 40
                    , width: '80%'
                    , borderRadius: 10
                    , justifyContent: 'center'
                    , alignItems: 'center'
                }}>
                <Text style={{ color: validPassword.test(password) ? 'white' : '#313131', letterSpacing: 1 }}>{password != '' ? validPassword.test(password) ? 'INGRESAR' : 'CONTRASEÑA INVÁLIDA' : 'CONTRASEÑA VACÍA'}</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
        </View>
    )
}
