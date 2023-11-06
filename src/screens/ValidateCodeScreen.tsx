import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native'
import { vct } from '../theme/CodeValidatorTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useRoute } from '@react-navigation/native';
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { useNavigation } from '@react-navigation/native'

export const ValidateCodeScreen = () => {

    const navigation = useNavigation()
    const [code, setCode] = useState('')
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const route = useRoute()
    const { email }: any = route.params
    const { height } = useWindowDimensions()

    const { getCode
        , isInvalidCode
        , setIsInvalidCode
        , loading
        , isExpiredCode
        , setIsExpiredCode
        , resendCode
        , isPendingCode
        , setIsPendingCode
        , isCodeResend
        , setIsCodeResend
    } = EmailLoginFunction()

    useEffect(() => {
        if (isInvalidCode) {
            setTimeout(() => {
                setIsInvalidCode(false)
            }, 2500)
        }
    }, [isInvalidCode])

    useEffect(() => {
        if (isPendingCode) {
            setTimeout(() => {
                setIsPendingCode(false)
            }, 2500)
        }
    }, [isPendingCode])

    useEffect(() => {
        if (isCodeResend) {
            setTimeout(() => {
                setIsCodeResend(false)
            }, 2500)
        }
    }, [isCodeResend])

    useEffect(() => {
        if (isExpiredCode) {
            setTimeout(() => {
                setIsExpiredCode(false)
            }, 5000)
        }
    }, [isExpiredCode])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : 'null'}
                keyboardVerticalOffset={height / 10}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}
            >
                <View style={{ ...vct.container, backgroundColor: colors.background }}>
                    <View style={{ ...vct.titleDiv }}>
                        <Text style={{ ...vct.titleTxt, color: colors.text }}>Código de verificación</Text>
                        <Text style={{ ...vct.subtxt, color: colors.text }}>Ingresa el código de verificación enviado a tu correo para iniciar sesión.</Text>
                    </View>

                    <ToastMessageComponent
                        backgroundColor={customColors.bgSuccesMessage}
                        iconColor={customColors.colorSuccessMessage}
                        textColor={customColors.colorSuccessMessage}
                        title='¡Bien hecho!'
                        message={'El código se ha reenviado'}
                        visible={isCodeResend}
                        iconName={'checkcircleo'}
                    />

                    <ToastMessageComponent
                        backgroundColor={customColors.bgErrorMessage}
                        iconColor={customColors.colorErrorMessage}
                        textColor={customColors.colorErrorMessage}
                        title='¡Error!'
                        message={'El código ingresado no es válido'}
                        visible={isInvalidCode}
                        iconName={'closecircleo'}
                    />

                    <ToastMessageComponent
                        backgroundColor={customColors.bgErrorMessage}
                        iconColor={customColors.colorErrorMessage}
                        textColor={customColors.colorErrorMessage}
                        title='¡Error, el código ha vencido!'
                        message={'Reenvíe el código y vuelva a intentar'}
                        visible={isExpiredCode}
                        iconName={'closecircleo'}
                    />

                    <ToastMessageComponent
                        textColor={customColors.colorWarningMessage}
                        iconColor={customColors.colorWarningMessage}
                        backgroundColor={customColors.bgWarningMessage}
                        title='¡Revisa tu email!'
                        message={'El código es válido por 10 minutos'}
                        visible={isPendingCode}
                        iconName={'exclamationcircleo'}
                    />

                    <View style={{ ...vct.codeDiv }}>
                        <TextInput
                            style={{ ...vct.inputBox, color: currentTheme === 'light' ? 'black' : 'white', backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                            keyboardType='decimal-pad'
                            maxLength={6}
                            value={code}
                            onChangeText={text => setCode(text)}
                            placeholder='______'
                            placeholderTextColor={colors.text}
                        />

                    </View>
                    <View style={{ ...vct.buttonDiv }}>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ color: 'gray', fontFamily: 'verdana', fontSize: 16 }}>¿Aún no lo has recibido?</Text>
                            <TouchableOpacity
                                onPress={() => resendCode(email)}
                                hitSlop={{ bottom: 25, top: 25, left: 25, right: 25 }}>
                                <Text style={{ fontWeight: 'bold', color: isExpiredCode ? customColors.activeColor : 'gray', fontSize: 16, textDecorationLine: 'underline', textTransform: isExpiredCode ? 'uppercase' : 'none' }}> Reenviar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ gap: 25, width: '100%', alignItems: 'center' }}>
                            <View>
                                {/* <Text style={{ color: 'gray', fontFamily: 'verdana', fontSize: 16 }}>Válido por 10 minutos</Text> */}
                            </View>
                            <View style={{ width: '100%', gap: 30 }}>
                                <TouchableOpacity
                                    onPress={() => getCode(email, code)}
                                    style={{ ...vct.btn, backgroundColor: customColors.buttonColor }}>
                                    {loading ? <ActivityIndicator color={'white'} style={{ height: 0, width: 150, borderRadius: 200 }} /> : <Text style={{ ...vct.btnTxt }}>Confirmar</Text>}
                                </TouchableOpacity>

                                <Text onPress={() => navigation.navigate('HomeScreen')} style={{ fontSize: 17, fontWeight: 'bold', color: 'gray', alignSelf: 'center' }}>Cancelar</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
