import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import { vct } from '../theme/CodeValidatorTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useRoute } from '@react-navigation/native';
import { ToastMessageComponent } from './ToastMessageComponent'

export const ValidateCodeComponent = () => {

    const [digits, setDigits] = useState('')
    const { theme } = useContext(ThemeContext)
    const route = useRoute()
    const { code, email }: any = route.params
    const [showToast, setShowToast] = useState(false)

    const { getCode, expiration, afterEmailVerification, loading } = EmailLoginFunction()



    const handleCompareCode = async (digits: string) => {
        if (digits !== code) {
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
        }
        if (digits === code) {
            afterEmailVerification(email)
        }
    }

    return (

        loading
            ? <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ height: 0, width: 150, backgroundColor: 'white', borderRadius: 200 }} />

            : <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ ...vct.container, backgroundColor: theme.colors.background }}>
                    <ToastMessageComponent iconName={'closecircleo'} textColor={'white'} iconColor={'white'} iconSize={24} backgroundColor={'#950101'} visible={showToast} title={'¡Código incorrecto!'} message={'El código ingresado no es válido'} />
                    <View style={{ ...vct.titleDiv }}>
                        <Text style={{ ...vct.titleTxt, color: theme.colors.text }}>Código de validación</Text>
                        <Text style={{ ...vct.subtxt, color: theme.colors.text }}>Ingresa el código de validación enviado a tu correo para activar tu cuenta.</Text>
                    </View>

                    <View style={{ ...vct.codeDiv }}>
                        <TextInput
                            style={{ ...vct.inputBox, color: theme.currentTheme === 'light' ? 'black' : 'white', backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                            keyboardType='decimal-pad'
                            maxLength={6}
                            value={digits}
                            onChangeText={text => setDigits(text)}
                            placeholder='______'
                            placeholderTextColor={theme.colors.text}

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
                                <TouchableOpacity onPress={() => handleCompareCode(digits)} style={{ ...vct.btn, backgroundColor: theme.customColors.buttonColor }}>
                                    <Text style={{ ...vct.btnTxt }}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
    )
}
