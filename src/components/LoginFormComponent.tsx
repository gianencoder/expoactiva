
import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Platform, Button, TouchableWithoutFeedback } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from './ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'
import { DatePickerComponent } from './DatePickerComponent'
import { formatDate } from '../util/utils'

interface Props {
    name: string,
    email: string,
    bornDay: Date,
    setName: (text: string) => void
    setBornDay: (text: Date) => void
    setEmail: (text: string) => void
    signUp: (name: string, email: string, bornDay: Date) => void
    handleFormCancel: () => void;
}

export const LoginFormComponent = ({ name, email, setName, setBornDay, setEmail, signUp, handleFormCancel, bornDay }: Props) => {

    const { theme } = useContext(ThemeContext)
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [isVisible, setIsVisible] = useState(false)
    const [emptyField, setEmptyField] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)

    const handleSignUp = () => {
        Keyboard.dismiss()
        if (name == '' || bornDay == null) {
            setIsVisible(true)
            setEmptyField(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 2500)

        } else if (!validEmail.test(email)) {
            setIsVisible(true)
            setEmptyField(false)
            setIsValidEmail(false)
            setTimeout(() => {
                setIsVisible(false)
            }, 2500)
        } else {
            signUp(name, email, bornDay)
            setName('')
            setEmail('')
            setIsVisible(false)
            setEmptyField(false)
        }
    }

    const handleCancel = () => {

        handleFormCancel();

    }

    return (

        <View style={{ flex: 1, gap: 25 }}>
            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 19, color: theme.colors.text }}>Crear cuenta</Text>
            <ToastMessageComponent
                iconName={'closecircleo'}
                textColor={theme.customColors.colorErrorMessage}
                iconColor={theme.customColors.colorErrorMessage}
                backgroundColor={theme.customColors.bgErrorMessage}
                iconSize={24}
                visible={isVisible}
                title={'¡Error!'}
                message={emptyField ? 'Todos los campos son obligatorios' : !validEmail.test(email) ? 'El email no es válido' : ''} />

            <View style={authStyle.formView}>

                <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Nombre y Apellido (*)</Text>
                <TextInput
                    clearButtonMode='while-editing'
                    maxLength={50}
                    keyboardType='default'
                    value={name}
                    onChangeText={text => setName(text)}
                    style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Nombre y apellido' placeholderTextColor={'gray'} />
            </View>
            <View style={authStyle.formView}>

                <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Fecha de nacimiento (*)</Text>
                <DatePickerComponent
                    onPress={() => Keyboard.dismiss()}
                    defaultDate={'2000-01-01'}
                    onDateChange={(value: Date) => setBornDay(value)}
                />
            </View>
            <View style={authStyle.formView}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={{
                        backgroundColor: name !== '' && email !== '' && bornDay !== null && validEmail.test(email) ? theme.customColors.buttonColor : '#DBD8E3'
                        , height: 40
                        , width: '90%'
                        , borderRadius: 10
                        , justifyContent: 'center'
                        , alignItems: 'center'
                        , alignSelf: 'center'
                    }}>
                    <Text style={{ color: name !== '' && bornDay !== null && validEmail.test(email) ? 'white' : '#4B5D67', letterSpacing: 1 }}>{name === '' || email === '' || bornDay === null ? 'COMPLETA TODOS LOS CAMPOS' : !validEmail.test(email) ? 'EMAIL INVÁLIDO' : 'CREAR'}</Text>
                </TouchableOpacity>
                <Text onPress={handleCancel} style={{ alignSelf: 'center', fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
            </View>
        </View>


    )
}
