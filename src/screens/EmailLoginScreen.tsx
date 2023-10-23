import React, { useContext, useEffect, useState } from 'react'
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
    Modal

} from 'react-native'

import { emailTheme } from '../theme/EmailLoginTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ticketStyles } from '../theme/TicketsTheme'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import DateTimePicker from '@react-native-community/datetimepicker';



export const EmailLoginScreen = () => {

    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState('mendoza.gian@hotmail.com')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [name, setName] = useState('')
    const { getUserByEmail, exist, isChecking, signIn } = EmailLoginFunction()

    const closeKeyboard = () => {
        Keyboard.dismiss(); // Cierra el teclado
    };

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }} >

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

                    {isChecking && !exist &&
                        <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
                            <Text style={{ alignSelf: 'flex-start', padding: 20, fontWeight: 'bold', fontSize: 20, color: theme.colors.text }}>Ingresa tu email</Text>

                            <TextInput keyboardType='email-address' value={email} onChangeText={text => setEmail(text.toLowerCase())} style={{ ...emailTheme.ef, color: theme.currentTheme === 'light' ? '#474747' : '#787878', backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Ingresa tu email' placeholderTextColor={'gray'} />

                            <TouchableOpacity
                                onPress={() => getUserByEmail(email.toLowerCase())}
                                style={{
                                    backgroundColor: '#2A2071'
                                    , height: 40
                                    , width: '90%'
                                    , borderRadius: 10
                                    , justifyContent: 'center'
                                    , alignItems: 'center'
                                }}>
                                <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>continuar</Text>
                            </TouchableOpacity>
                        </View>
                    }


                    {!isChecking && exist &&
                        <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
                            <Text style={{ alignSelf: 'flex-start', padding: 20, fontWeight: 'bold', fontSize: 20, color: theme.colors.text }}>Ingresa tu contraseña</Text>

                            <TextInput secureTextEntry keyboardType='email-address' value={password} onChangeText={text => setPassword(text)} style={{ ...emailTheme.ef, color: theme.currentTheme === 'light' ? '#474747' : '#787878', backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Ingresa tu contraseña' placeholderTextColor={'gray'} />

                            <Text style={{ fontWeight: '400', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 16, padding: 10, textDecorationLine: 'underline' }}>Olvide mi contraseña</Text>
                            <TouchableOpacity
                                onPress={() => signIn(email, password)}
                                style={{
                                    backgroundColor: '#2A2071'
                                    , height: 40
                                    , width: '90%'
                                    , borderRadius: 10
                                    , justifyContent: 'center'
                                    , alignItems: 'center'
                                }}>
                                <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>ingresar</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>

                        </View>
                    }

                    {!isChecking && !exist &&
                        <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
                            <Text style={{ alignSelf: 'flex-start', padding: 20, fontWeight: 'bold', fontSize: 20, color: theme.colors.text }}>Ingresa tus datos</Text>
                            <TextInput keyboardType='default' value={name} onChangeText={text => setName(text)} style={{ ...emailTheme.ef, color: theme.currentTheme === 'light' ? 'black' : 'white', backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Ingresa tu nombre' placeholderTextColor={'gray'} />
                            <TextInput secureTextEntry keyboardType='email-address' value={password} onChangeText={text => setPassword(text)} style={{ ...emailTheme.ef, color: theme.currentTheme === 'light' ? 'black' : 'white', backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Ingresa tu contraseña' placeholderTextColor={'gray'} />
                            <TextInput secureTextEntry keyboardType='email-address' value={password2} onChangeText={text => setPassword2(text)} style={{ ...emailTheme.ef, color: theme.currentTheme === 'light' ? 'black' : 'white', backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Repite la contraseña' placeholderTextColor={'gray'} />

                            <TouchableOpacity
                                onPress={() => getUserByEmail(email.toLowerCase())}
                                style={{
                                    backgroundColor: '#2A2071'
                                    , height: 40
                                    , width: '90%'
                                    , borderRadius: 10
                                    , justifyContent: 'center'
                                    , alignItems: 'center'
                                }}>
                                <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>registrarme</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
                        </View>
                    }


                </View>
            </KeyboardAvoidingView >
        </TouchableWithoutFeedback >
    )
}
