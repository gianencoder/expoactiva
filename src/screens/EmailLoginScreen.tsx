import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    View
    , Text
    , TextInput
    , KeyboardAvoidingView
    , Platform
    , Keyboard
    , TouchableWithoutFeedback
    , TouchableOpacity
    , Pressable,
    Modal,
    ActivityIndicator

} from 'react-native'

import { emailTheme } from '../theme/EmailLoginTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ticketStyles } from '../theme/TicketsTheme'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ToastMessageComponent } from '../components/ToastMessageComponent'



export const EmailLoginScreen = () => {

    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState('mendoza.gian@hotmail.com')
    const [password, setPassword] = useState('12345678')
    const [password2, setPassword2] = useState('')
    const [name, setName] = useState('')
    const { getUserByEmail, exist, isChecking, signIn, visible, loading, response } = EmailLoginFunction()

    const closeKeyboard = () => {
        Keyboard.dismiss(); // Cierra el teclado
    };




    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }} >
                <ToastMessageComponent visible={visible} timeout={1500} title={'¡Bien hecho!'} message={'Has iniciado sesión correctamente'} />

                <View style={{
                    backgroundColor: theme.colors.background
                    , width: '90%'
                    , height: 'auto'
                    , borderRadius: 15
                    , justifyContent: "center"
                    , alignItems: "center"
                    , shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                    elevation: 24,
                }}>


                    {isChecking &&
                        <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>

                            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 19, color: theme.colors.text }}>Iniciar Sesión</Text>
                            <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 20, fontSize: 16, color: theme.colors.text }}>Email</Text>

                            <TextInput keyboardType='email-address' value={email} onChangeText={text => setEmail(text.toLowerCase())} style={{ ...emailTheme.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='ejemplo@hotmail.com' placeholderTextColor={'gray'} />

                            <TouchableOpacity
                                onPress={() => getUserByEmail(email.toLowerCase())}
                                style={{
                                    backgroundColor: '#227C70'
                                    , height: 40
                                    , width: '90%'
                                    , borderRadius: 10
                                    , justifyContent: 'center'
                                    , alignItems: 'center'
                                }}>
                                <Text style={{ ...ticketStyles, color: 'white', letterSpacing: 1 }}>CONTINUAR</Text>
                            </TouchableOpacity>
                        </View>
                    }


                    {!isChecking && exist &&
                        <>
                            {
                                loading
                                    ?
                                    <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
                                        <ActivityIndicator size={'small'} color={theme.customColors.activeColor} style={{ height: 300, width: '100%' }} />
                                    </View>
                                    :
                                    !response &&
                                    <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
                                        <Text style={{ alignSelf: 'flex-start', padding: 20, fontWeight: 'bold', fontSize: 15, color: theme.colors.text }}>Contraseña</Text>
                                        <TextInput secureTextEntry value={password} onChangeText={text => setPassword(text)} style={{ ...emailTheme.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Contraseña' placeholderTextColor={'gray'} />
                                        <Text style={{ fontWeight: '400', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 16, padding: 10, textDecorationLine: 'underline' }}>Olvide mi contraseña</Text>

                                        <TouchableOpacity
                                            onPress={() => signIn(email, password)}
                                            style={{
                                                backgroundColor: '#227C70'
                                                , height: 40
                                                , width: '90%'
                                                , borderRadius: 10
                                                , justifyContent: 'center'
                                                , alignItems: 'center'
                                            }}>
                                            <Text style={{ ...ticketStyles.btt, color: 'white', letterSpacing: 1 }}>INGRESAR</Text>
                                        </TouchableOpacity>
                                        <Text style={{ fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
                                    </View>

                            }
                        </>
                    }

                    {!isChecking && !exist &&
                        <>
                            <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
                                <Text style={{ alignSelf: 'flex-start', padding: 20, fontSize: 18, color: theme.colors.text }}>El correo electronico ingresado no tiene cuenta asociada</Text>
                                <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 20, fontSize: 15, color: theme.colors.text }}>Crear cuenta</Text>
                                <TextInput keyboardType='default' value={name} onChangeText={text => setName(text)} style={{ ...emailTheme.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Nombre y apellido' placeholderTextColor={'gray'} />
                                <TextInput keyboardType='email-address' value={email} onChangeText={text => setEmail(text)} style={{ ...emailTheme.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Email' placeholderTextColor={'gray'} />
                                <TextInput secureTextEntry value={password} onChangeText={text => setPassword(text)} style={{ ...emailTheme.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Contraseña' placeholderTextColor={'gray'} />
                                <TouchableOpacity
                                    onPress={() => getUserByEmail(email.toLowerCase())}
                                    style={{
                                        backgroundColor: '#227C70'
                                        , height: 40
                                        , width: '90%'
                                        , borderRadius: 10
                                        , justifyContent: 'center'
                                        , alignItems: 'center'
                                    }}>
                                    <Text style={{ ...ticketStyles.btt, color: 'white', letterSpacing: 1 }}>CREAR</Text>
                                </TouchableOpacity>
                                <Text style={{ fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
                            </View>
                        </>
                    }
                </View>
            </KeyboardAvoidingView >
        </TouchableWithoutFeedback >
    )
}
