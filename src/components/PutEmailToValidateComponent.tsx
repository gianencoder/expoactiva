import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from './ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'


interface Props {
    email: string
    setEmail: (text: string) => void
    getUserByEmail: (text: string, isValid: boolean) => void
}

export const PutEmailToValidateComponent = ({ email, setEmail, getUserByEmail }: Props) => {

    const { theme } = useContext(ThemeContext)
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [isValid, setIsValid] = useState(true)


    const handleButtonPress = () => {

        if (!validEmail.test(email)) {
            setIsValid(false)
            setTimeout(() => {
                setIsValid(true)
            }, 2500)
        } else {
            getUserByEmail(email.toLowerCase(), validEmail.test(email));
        }
    };

    return (

        <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
            <ToastMessageComponent iconName={'closecircleo'} textColor={'white'} iconColor={'white'} iconSize={24} backgroundColor={'#950101'} visible={!isValid} title={'¡Error!'} message={email != '' ? 'El email no es válido' : 'No puedes dejar el campo vacío'} />
            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 19, color: theme.colors.text }}>Iniciar Sesión</Text>


            <View style={authStyle.formView}>
                <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Email (*)</Text>
                <TextInput
                    autoComplete={'email'}
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
                    , width: '80%'
                    , borderRadius: 10
                    , justifyContent: 'center'
                    , alignItems: 'center'
                }}>
                <Text style={{ color: validEmail.test(email) ? 'white' : '#313131', letterSpacing: 1 }}>{email != '' ? validEmail.test(email) ? 'CONTINUAR' : 'EMAIL INVÁLIDO' : 'INGRESA EMAIL PARA CONTINUAR'}</Text>
            </TouchableOpacity>
        </View>
    )
}
