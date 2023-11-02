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
    handleFormCancel: () => void;
}

export const AuthPasswordComponent = ({ email, password, setPassword, signIn, handleFormCancel }: Props) => {

    const { theme } = useContext(ThemeContext)
    const [isValid, setIsValid] = useState(true)



    const handleButtonPress = () => {
        if (password === '') {
            setIsValid(false)
            setTimeout(() => {
                setIsValid(true)
            }, 2500)
        } else {
            signIn(email, password)
        }
    };

    const handleCancel = () => {
        handleFormCancel();
    }

    return (
        <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
            <ToastMessageComponent iconName={'closecircleo'} textColor={'white'} iconColor={'white'} iconSize={24} backgroundColor={'#950101'} visible={!isValid} title={'¡Error!'} message={'Ingresa una contraseña por favor'} />
            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 19, color: theme.colors.text }}>Iniciar Sesión</Text>


            <View style={authStyle.formView}>
                <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Contraseña</Text>

                <TextInput
                    clearButtonMode='while-editing'
                    keyboardType='visible-password'
                    autoCorrect={false}
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                    placeholder='Ingresa tu contraseña'
                    placeholderTextColor={'gray'}
                    maxLength={20}
                />
            </View>
            <Text style={{ fontWeight: '400', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 16, padding: 10, textDecorationLine: 'underline' }}>Olvide mi contraseña</Text>

            <TouchableOpacity
                onPress={handleButtonPress}
                style={{
                    backgroundColor: password !== '' ? theme.customColors.buttonColor : '#DBD8E3'
                    , height: 40
                    , width: '80%'
                    , borderRadius: 10
                    , justifyContent: 'center'
                    , alignItems: 'center'
                }}>
                <Text style={{ color: password !== '' ? 'white' : '#313131', letterSpacing: 1 }}>{password !== '' ? 'INGRESAR' : 'CONTRASEÑA VACÍA'}</Text>
            </TouchableOpacity>
            <Text onPress={handleCancel} style={{ fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
        </View>
    )
}
