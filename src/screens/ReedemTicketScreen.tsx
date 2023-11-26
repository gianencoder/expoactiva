import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { editProfileTheme } from '../theme/EditProfileTheme'
import { authStyle } from '../theme/AuthTheme'
import { useNavigation } from '@react-navigation/native'
import { useTicketManager } from '../hooks/useTicketManager'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { useRedeemTicket } from '../context/RedeemTicketContext/RedeemTicketContext'
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import { loadTranslations, translations } from '../util/utils'

export const ReedemTicketScreen = () => {
    const mounted = useRef(false);
    const { theme, theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const navigation = useNavigation()
    const { redeemTicket, loading } = useTicketManager()
    const [code, setCode] = useState('')
    const [emptyCode, setEmptyCode] = useState(false)
    const [showErrorTicketToast, setShowErrorTicketToast] = useState(false);
    const { claimedTicket, redeemTicketAttempt } = useRedeemTicket();
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    useEffect(() => {

        if (mounted.current) {
            if (!claimedTicket) {
                setTimeout(() => {
                    setShowErrorTicketToast(true);
                }, 500);
                setTimeout(() => {
                    setShowErrorTicketToast(false);
                }, 2800);
            }
        } else {
            mounted.current = true;
        }
    }, [redeemTicketAttempt]);

    const handleReedem = () => {
        if (code.length <= 0) {
            setEmptyCode(true)
            setTimeout(() => {
                setEmptyCode(false)
            }, 2500)
        } else {
            Keyboard.dismiss()
            redeemTicket(code)
        }
    }

    return (

        <>
            {loading

                ? <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.colors.background }}><ActivityIndicator size={'large'} color={theme.customColors.activeColor} /></View>
                : <View style={{ ...ticketStyles.container2, backgroundColor: colors.background }}>
                    <Text style={{ fontSize: 25, color: colors.text }}>{translation.reedemTicketScreen.loadingMessage}</Text>
                    <ToastMessageComponent
                        backgroundColor={customColors.bgErrorMessage}
                        iconColor={customColors.colorErrorMessage}
                        textColor={customColors.colorErrorMessage}
                        title={translation.reedemTicketScreen.emptyCodeErrorMessage.title}
                        message={translation.reedemTicketScreen.emptyCodeErrorMessage.message}
                        visible={emptyCode}
                        iconName={'closecircleo'}
                    />
                    <ToastMessageComponent
                        backgroundColor={customColors.bgErrorMessage}
                        iconColor={customColors.colorErrorMessage}
                        textColor={customColors.colorErrorMessage}
                        title={translation.reedemTicketScreen.ticketNotFoundError.title}
                        message={translation.reedemTicketScreen.ticketNotFoundError.message}
                        visible={showErrorTicketToast}
                        iconName={'closecircleo'}
                    />
                    <View style={editProfileTheme.div}>
                        <View style={{ width: '100%', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Text style={{ ...editProfileTheme.labelName, color: colors.text }}>{translation.reedemTicketScreen.labelText}</Text>
                            <Text style={{ ...editProfileTheme.labelName, color: emptyCode ? 'red' : colors.text, fontSize: emptyCode ? 25 : 18 }}>*</Text>
                        </View>

                        <TextInput
                            clearButtonMode='while-editing'
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoComplete='off'
                            maxLength={50}
                            keyboardType='default'
                            value={code}
                            onChangeText={text => setCode(text)}
                            style={{ ...authStyle.ef, color: colors.text, backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                            placeholder={translation.reedemTicketScreen.placeholder} placeholderTextColor={'gray'} />
                    </View>
                    <TouchableOpacity
                        onPress={handleReedem}
                        style={{
                            backgroundColor: code.length > 0 ? '#F05950' : 'gray'
                            , height: 40
                            , width: '100%'
                            , borderRadius: 10
                            , justifyContent: 'center'
                            , alignItems: 'center'
                            , alignSelf: 'center'
                        }}>
                        <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>{code.length > 0 ? translation.reedemTicketScreen.redeemButtonText.withCode : translation.reedemTicketScreen.redeemButtonText.withoutCode}</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.goBack()} style={{ alignSelf: 'center', fontWeight: '600', color: currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18 }}>{translation.reedemTicketScreen.cancelButtonText}</Text>
                </View>
            }
        </>

    )
}
