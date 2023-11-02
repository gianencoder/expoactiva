import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert } from 'react-native'
import { vct } from '../theme/CodeValidatorTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useRoute } from '@react-navigation/native';
import { ToastMessageComponent } from '../components/ToastMessageComponent'


export const ValidateCodeScreen = () => {

    const [code, setCode] = useState('')
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const route = useRoute()
    const { email }: any = route.params

    const { getCode, isInvalidCode, setIsInvalidCode, loading } = EmailLoginFunction()

    useEffect(() => {
        if (isInvalidCode) {
            setTimeout(() => {
                setIsInvalidCode(false)
            }, 2500)
        }
    }, [isInvalidCode])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ ...vct.container, backgroundColor: colors.background }}>
                <View style={{ ...vct.titleDiv }}>
                    <Text style={{ ...vct.titleTxt, color: colors.text }}>Código de verificación</Text>
                    <Text style={{ ...vct.subtxt, color: colors.text }}>Ingresa el código de verificación enviado a tu correo para activar tu cuenta.</Text>
                </View>

                <ToastMessageComponent
                    backgroundColor={customColors.bgErrorMessage}
                    title='¡Error!'
                    message={'El código ingresado no es válido'}
                    visible={isInvalidCode} />

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
                        <Text style={{ color: 'gray', fontFamily: 'verdana', fontSize: 16 }}>Aun no lo has recibido?</Text>
                        <Text style={{ fontWeight: '400', color: 'gray', fontFamily: 'verdana', fontSize: 16, textDecorationLine: 'underline' }}> Reenviar</Text>
                    </View>
                    <View style={{ gap: 50, width: '100%', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: 'gray', fontFamily: 'verdana', fontSize: 16 }}>Válido por 24 horas</Text>
                        </View>
                        <View style={{ width: '100%', }}>
                            <TouchableOpacity
                                onPress={() => getCode(email, code)}
                                style={{ ...vct.btn, backgroundColor: customColors.buttonColor }}>
                                {loading ? <ActivityIndicator color={'white'} style={{ height: 0, width: 150, borderRadius: 200 }} /> : <Text style={{ ...vct.btnTxt }}>Confirmar</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
