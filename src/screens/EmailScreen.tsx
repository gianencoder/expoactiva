import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useNavigation } from '@react-navigation/native'
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import { loadTranslations, translations } from '../util/utils'

export const EmailScreen = () => {

    const { theme } = useContext(ThemeContext)
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [isValid, setIsValid] = useState(true)
    const [showLimit, setShowLimit] = useState(false)
    const [email, setEmail] = useState('')
    const { loading, limitRequestByDevice, limitRequest } = EmailLoginFunction()
    const { height } = useWindowDimensions()
    const navigation = useNavigation()
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    useEffect(() => {
        if (limitRequest)
            setShowLimit(true)
        setTimeout(() => {
            setShowLimit(false)
        }, 4500)
    }, [limitRequest])


    const handleButtonPress = () => {
        if (!validEmail.test(email)) {
            setIsValid(false)
            setTimeout(() => {
                setIsValid(true)
            }, 2500)
        }
        else if (limitRequest) {
            setShowLimit(true)
            setTimeout(() => {
                setShowLimit(false)
            }, 4500)
        } else {
            limitRequestByDevice(email.toLowerCase());
        }
    };

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <ScrollView onScrollBeginDrag={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
            <TouchableWithoutFeedback onPress={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "height" : null}
                    keyboardVerticalOffset={height / 10}
                    style={{ flex: 1, backgroundColor: theme.colors.background }}
                >
                    <View style={{ ...authStyle.mainView, backgroundColor: theme.colors.background }}>
                        <View style={{ flex: 1, gap: 25 }}>
                            <ToastMessageComponent
                                iconName={'closecircleo'}
                                textColor={theme.customColors.colorErrorMessage}
                                iconColor={theme.customColors.colorErrorMessage}
                                backgroundColor={theme.customColors.bgErrorMessage}
                                visible={!isValid}
                                title={translation.emailScreen.errorTitle}
                                message={email != '' ? translation.emailScreen.invalidEmailMessage : translation.emailScreen.emptyEmailError} />

                            <ToastMessageComponent
                                iconName={'exclamationcircleo'}
                                textColor={theme.customColors.colorWarningMessage}
                                iconColor={theme.customColors.colorWarningMessage}
                                backgroundColor={theme.customColors.bgWarningMessage}
                                visible={showLimit}
                                title={translation.emailScreen.warningTitle}
                                message={translation.emailScreen.warningMessage} />
                            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 28, color: theme.colors.text, fontWeight: '300' }}>{translation.emailScreen.loginTitle}</Text>


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
                                    style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder={translation.emailScreen.placeholder} placeholderTextColor={'gray'} />

                            </View>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={handleButtonPress}
                                activeOpacity={0.8}
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
                                    : <Text style={{ color: validEmail.test(email) ? 'white' : '#313131', letterSpacing: 1 }}>{email != '' ? validEmail.test(email) ? translation.emailScreen.continueButton : translation.emailScreen.invalidEmailMessage : translation.emailScreen.enterEmailMessage}</Text>}
                            </TouchableOpacity>
                            <Text onPress={() => navigation.goBack()} style={{ alignSelf: 'center', fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>{translation.emailScreen.cancelButton}</Text>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}
