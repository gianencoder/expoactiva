import React, { useContext, useState } from 'react'
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { vct } from '../theme/CodeValidatorTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const ValidateCodeComponent = () => {

    const [digits, setDigits] = useState('')
    const { theme } = useContext(ThemeContext)
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ ...vct.container, backgroundColor: theme.colors.background }}>
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
                    />
                </View>
                <View style={{ ...vct.buttonDiv }}>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Text style={{ color: theme.colors.text }}>Aun no lo has recibido?</Text>
                        <Text style={{ fontWeight: 'bold', color: theme.colors.text }}> Reenviar</Text>
                    </View>

                    <View style={{ width: '100%', }}>
                        <TouchableOpacity style={{ ...vct.btn, backgroundColor: theme.customColors.buttonColor }}>
                            <Text style={{ ...vct.btnTxt }}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
