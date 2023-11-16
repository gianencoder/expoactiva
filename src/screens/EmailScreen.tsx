import React, { useContext, useState } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useNavigation } from '@react-navigation/native'

export const EmailScreen = () => {

    const { theme } = useContext(ThemeContext)
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [isValid, setIsValid] = useState(true)
    const [email, setEmail] = useState('')
    const { getUserByEmail, loading, signIn } = EmailLoginFunction()
    const { height } = useWindowDimensions()
    const navigation = useNavigation()


    const handleButtonPress = () => {
        if (!validEmail.test(email)) {
            setIsValid(false)
            setTimeout(() => {
                setIsValid(true)
            }, 2500)
        } else {
            getUserByEmail(email.toLowerCase());
        }
    };

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : null}
                keyboardVerticalOffset={height / 10}
                style={{ flex: 1, backgroundColor: theme.colors.background }}
            >

                {loading
                    ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ height: 100, backgroundColor: theme.colors.background, borderRadius: 200 }} />
                        <Text style={{ fontSize: 18, color: 'gray' }}>Obteniendo información. Por favor, espere...</Text>
                    </View>

                    : <View style={{ ...authStyle.mainView, backgroundColor: theme.colors.background }}>
                        <View style={{ flex: 1, gap: 25 }}>
                            <ToastMessageComponent
                                iconName={'closecircleo'}
                                textColor={theme.customColors.colorErrorMessage}
                                iconColor={theme.customColors.colorErrorMessage}
                                backgroundColor={theme.customColors.bgErrorMessage}
                                visible={!isValid}
                                title={'¡Error!'}
                                message={email != '' ? 'El email no es válido' : 'No puedes dejar el campo vacío'} />
                            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 28, color: theme.colors.text, fontWeight: '400'}}>Iniciar sesión</Text>


                            <View style={authStyle.formView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Email</Text>
                                    <Text style={{ fontSize: email === '' ? 25 : 20, color: email === '' ? 'red' : theme.colors.text }}>*</Text>
                                </View>

                                <TextInput
                                    autoComplete={'email'}
                                    clearButtonMode='while-editing'
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={text => setEmail(text.toLowerCase())}
                                    style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='ejemplo@hotmail.com' placeholderTextColor={'gray'} />

                            </View>
                            <TouchableOpacity
                                onPress={handleButtonPress}
                                activeOpacity={1}
                                style={{
                                    backgroundColor: validEmail.test(email) ? theme.customColors.buttonColor : '#DBD8E3'
                                    , height: 40
                                    , width: '100%'
                                    , borderRadius: 10
                                    , justifyContent: 'center'
                                    , alignItems: 'center'
                                    , alignSelf: 'center'
                                    , marginTop: 15
                                }}>
                                {loading
                                    ? <ActivityIndicator color={'white'} style={{ height: 0, width: 150, borderRadius: 200 }} />
                                    : <Text style={{ color: validEmail.test(email) ? 'white' : '#313131', letterSpacing: 1 }}>{email != '' ? validEmail.test(email) ? 'CONTINUAR' : 'EMAIL INVÁLIDO' : 'INGRESA EMAIL PARA CONTINUAR'}</Text>}
                            </TouchableOpacity>
                            <Text onPress={() => navigation.navigate('AuthScreen')} style={{ alignSelf: 'center', fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
                        </View>
                    </View>
                }
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
