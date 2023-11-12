import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { editProfileTheme } from '../theme/EditProfileTheme'
import { authStyle } from '../theme/AuthTheme'
import { useNavigation } from '@react-navigation/native'
import { useTicketManager } from '../hooks/useTicketManager'
import { ToastMessageComponent } from '../components/ToastMessageComponent'

export const ReedemTicketScreen = () => {
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const navigation = useNavigation()
    const { redeemTicket, changed, changedError, setChanged, setChangedError } = useTicketManager()
    const [code, setCode] = useState('')
    const [emptyCode, setEmptyCode] = useState(false)


    useEffect(() => {
        if (changed) {
            setTimeout(() => {
                setChanged(false)
            }, 2500)
        }
    }, [changed])

    useEffect(() => {

        if (changedError) {
            setTimeout(() => {
                setChangedError(false)
            }, 2500)
        }
    }, [changedError])


    const handleReedem = () => {
        if (code.length <= 0) {
            setEmptyCode(true)
            setTimeout(() => {
                setEmptyCode(false)
            }, 2500)
        } else {
            redeemTicket(code)
        }

    }

    return (
        <View style={{ ...ticketStyles.container2, backgroundColor: colors.background }}>
            <ToastMessageComponent
                backgroundColor={customColors.bgSuccesMessage}
                iconColor={customColors.colorSuccessMessage}
                textColor={customColors.colorSuccessMessage}
                title='¡Bien hecho!'
                message={'Has recibido una entrada'}
                visible={changed}
                iconName={'checkcircleo'}
            />

            <ToastMessageComponent
                backgroundColor={customColors.bgErrorMessage}
                iconColor={customColors.colorErrorMessage}
                textColor={customColors.colorErrorMessage}
                title='¡Error!'
                message={'Introduce un código, por favor'}
                visible={emptyCode}
                iconName={'closecircleo'}
            />

            <ToastMessageComponent
                backgroundColor={customColors.bgErrorMessage}
                iconColor={customColors.colorErrorMessage}
                textColor={customColors.colorErrorMessage}
                title='¡Error!'
                message={'El código introducido no es válido'}
                visible={changedError}
                iconName={'closecircleo'}
            />

            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 25 }}>Canjea tu entrada</Text>
            </View>

            <View style={editProfileTheme.div}>
                <View style={{ width: '100%', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <Text style={{ ...editProfileTheme.labelName, color: colors.text }}>Código</Text>
                    <Text style={{ ...editProfileTheme.labelName, color: emptyCode ? 'red' : colors.text, fontSize: emptyCode ? 25 : 18 }}>*</Text>
                </View>

                <TextInput
                    clearButtonMode='while-editing'
                    maxLength={50}
                    keyboardType='default'
                    value={code}
                    onChangeText={text => setCode(text)}
                    style={{ ...authStyle.ef, color: colors.text, backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                    placeholder='Tu código aquí...' placeholderTextColor={'gray'} />
            </View>
            <TouchableOpacity
                onPress={handleReedem}
                style={{
                    backgroundColor: code.length > 0 ? '#F05941' : 'gray'
                    , height: 40
                    , width: '90%'
                    , borderRadius: 10
                    , justifyContent: 'center'
                    , alignItems: 'center'
                    , alignSelf: 'center'
                }}>
                <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>{code.length > 0 ? 'CANJEAR' : 'INGRESA UN CÓDIGO'}</Text>
            </TouchableOpacity>

            <Text onPress={() => navigation.navigate('TicketsScreen')} style={{ alignSelf: 'center', fontWeight: '600', color: currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
        </View>

    )
}
