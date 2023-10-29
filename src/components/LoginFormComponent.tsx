import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from './ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'



interface Props {
    name: string,
    email: string,
    password: string,
    setName: (text: string) => void
    setPassword: (text: string) => void
    setEmail: (text: string) => void
    signUp: (name: string, email: string, password: string) => void
    handleFormCancel: () => void;
}

export const LoginFormComponent = ({ name, password, email, setName, setPassword, setEmail, signUp, handleFormCancel }: Props) => {

    const { theme } = useContext(ThemeContext)
    const validPassword = /^(?=.*[A-Za-z0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [isVisible, setIsVisible] = useState(false)
    const [emptyField, setEmptyField] = useState(false)
    const { adding } = EmailLoginFunction()

    const handleSignUp = () => {
        Keyboard.dismiss()
        if (name == '' || email == '' || password == '') {
            setIsVisible(true)
            setEmptyField(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 2500)

        } else if (!validEmail.test(email) || !validPassword.test(password)) {
            setIsVisible(true)
            setEmptyField(false)
            setTimeout(() => {
                setIsVisible(false)
            }, 2500)
        } else {
            signUp(name, email, password)
            setName('')
            setPassword('')
            setEmail('')
            setIsVisible(false)
            setEmptyField(false)
        }
    }

    const handleCancel = () => {

        handleFormCancel();

    }

    return (
        adding
            ? <ActivityIndicator style={{ height: '50%' }} size={'large'} color={theme.customColors.activeColor} />
            : <View style={{ ...authStyle.createAccountForm, backgroundColor: theme.colors.background }}>
                <ToastMessageComponent iconName={'closecircleo'} textColor={'white'} iconColor={'white'} iconSize={24} backgroundColor={'#950101'} visible={isVisible} title={'¡Error!'} message={emptyField ? 'Todos los campos son obligatorios' : !validEmail.test(email) ? 'El email no es válido' : !validPassword.test(password) ? 'La contraseña no cumple los requisitos' : ''} />
                <Text style={{ alignSelf: 'flex-start', padding: 20, fontSize: 20, color: theme.colors.text }}>El email ingresado anteriormente no se encuentra asociado a una cuenta</Text>
                <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 20, fontSize: 18, color: theme.colors.text, fontWeight: '600' }}>Cree una cuenta</Text>

                <View style={{ ...authStyle.formView }}>
                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Nombre y Apellido (*)</Text>
                    <TextInput autoComplete='name-given' keyboardType='default' value={name} onChangeText={text => setName(text)} style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Nombre y apellido' placeholderTextColor={'gray'} />
                </View>

                <View style={{ ...authStyle.formView }}>
                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Email (*)</Text>
                    <TextInput
                        autoComplete='email'
                        keyboardType='email-address'
                        clearButtonMode='while-editing'
                        value={email} onChangeText={text => setEmail(text.toLowerCase())} style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Email' placeholderTextColor={'gray'} />
                </View>

                <View style={{ ...authStyle.formView }}>
                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Contraseña (*, Debe ingresar al menos 8 caracteres)</Text>
                    <TextInput secureTextEntry value={password} onChangeText={text => setPassword(text)} style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Contraseña' placeholderTextColor={'gray'} />
                </View>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={{
                        backgroundColor: name !== '' && email !== '' && password !== '' ? theme.customColors.buttonColor : '#DBD8E3'
                        , height: 40
                        , width: '90%'
                        , borderRadius: 10
                        , justifyContent: 'center'
                        , alignItems: 'center'
                    }}>
                    <Text style={{ color: name !== '' && email !== '' && password !== '' ? 'white' : '#313131', letterSpacing: 1 }}>{name !== '' && email !== '' && password !== '' ? 'CREAR' : 'COMPLETA TODOS LOS CAMPOS'}</Text>
                </TouchableOpacity>
                <Text onPress={handleCancel} style={{ fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>


            </View>

    )
}
